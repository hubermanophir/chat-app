import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {useState} from 'react';

function Profile({user}) {
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  const postsRef = firestore.collection('posts');
  const usersRef = firestore.collection('users');
  const [imageFile, setImageFile] = useState();
  const [imgUrl, setImgUrl] = useState();
  
  const updateProfileImage = () => {
    const uploadTask = storage.ref(imageFile.name).put(imageFile);
    uploadTask.on('state_changed', ()=>{
      storage.ref().child(imageFile.name).getDownloadURL().then(url=>{
        setImgUrl(url);
        saveUserToFirestore(url);
      });
    })
  };

  const query = postsRef.where("uid", '==', user.uid).limit(2).get().then(results =>{
    // console.log(results.docs[0].data());
  });
  const [posts] = useCollectionData(postsRef.where("uid", '==', user.uid).limit(2));

  const saveUserToFirestore = (url) => {
    usersRef.add({
      uid: user.uid,
      profileImage: url
    }).then(response => {
      console.log(response)
    });
  }

  const saveToFirestore = () => {
    postsRef.add({
      title: 'good post',
      content: 'lorem imposmlorem imposmlorem imposmlorem imposm',
      img: 'https://firebasestorage.googleapis.com/v0/b/fir-project-fcd59.appspot.com/o/download%20(1).jfif?alt=media&token=29854924-ac80-44f4-8900-f394c53648e7',
      uid: user.uid
    }).then(response => {
      console.log(response)
    })
  }

  return (
    <div>
      Welcome {user.displayName}
      {posts?.map(post=>{
        return (
          <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <img src={`${post.img}`} />
          </>
        );
      })}
      <button onClick={saveToFirestore}>Add Post</button>
      <input type="file" onChange={e=>{setImageFile(e.target.files[0])}} />
      <button onClick={updateProfileImage}>update profile image</button>
      <img src={imgUrl} />
      <button onClick={()=> firebase.auth().signOut()}>Sign Out</button>
    </div>
  );
}

export default Profile;