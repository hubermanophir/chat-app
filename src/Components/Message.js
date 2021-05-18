import React from "react";

export default function Message({ message, user }) {
  return (
    <div className="message">
      <div className="message-container">
        <div
          className={
            message.user_UID === user.uid
              ? "current-img-name"
              : "other-img-name"
          }
        >
          <img
            className={
              message.user_UID === user.uid ? "current-img" : "other-img"
            }
            src={message.user_image}
            alt=""
            style={{ height: "50px", width: "50px" }}
          />{" "}
          <div
            className={
              message.user_UID === user.uid
                ? "current-username"
                : "other-username"
            }
          >
            {message.username}
          </div>
        </div>
      </div>
      <div
        className={
          message.user_UID === user.uid ? "current-message" : "other-message"
        }
      >
        {message.message}
      </div>
    </div>
  );
}
