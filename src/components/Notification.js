import React from "react";

const Notification = ({ notification, error }) => {
  if (notification) {
    return (
      <div className={`${error ? "notification-error" : "notification"}`}>
        {notification}
      </div>
    );
  } else {
    return null;
  }
};

export default Notification;
