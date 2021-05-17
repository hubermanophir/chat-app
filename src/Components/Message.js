import React from "react";

export default function Message({ message, user }) {
  return (
    <div>
      {message.user_UID === user.uid ? (
        <div className="current-user">{message.message}</div>
      ) : (
        <div className="other-user">{message.message}</div>
      )}
    </div>
  );
}
