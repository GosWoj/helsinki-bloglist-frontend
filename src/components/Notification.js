import React from "react";
import PropTypes from "prop-types";

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

Notification.propTypes = {
  notification: PropTypes.string.isRequired,
};

export default Notification;
