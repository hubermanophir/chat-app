import React from "react";

export default function Message({ message, user }) {
  return (
    <div>
      <div
        className={
          message.user_UID === user.uid ? "current-user" : "other-user"
        }
      >
        <div>
          <img
            src={message.user_image}
            alt=""
            style={{ height: "50px", width: "50px" }}
          />{" "}
          {message.message}
        </div>
        {message.username}
      </div>
    </div>
  );
}
