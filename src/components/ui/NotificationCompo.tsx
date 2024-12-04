/** @format */

// components/Notification.tsx
import React from "react";

interface NotificationProps {
  title: string;
  description: string;
  image: string;
  icon: string;
}

export class NotificationCard extends React.Component<{
  title: string;
  description: string;
  image: string;
  icon: string;
}> {
  render() {
    const {title, image, icon, description} = this.props;
    return (
      <div style={styles.container}>
        <img src={icon} alt="Notification Icon" style={styles.icon} />
        <div style={styles.content}>
          <h4 style={styles.title}>{title}</h4>
          <p style={styles.description}>{description}</p>
        </div>
        <img src={image} alt="Notification Image" style={styles.image} />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    background: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  icon: {
    width: "40px",
    height: "40px",
    marginRight: "10px",
  },
  content: {
    flex: 1,
    paddingRight: "10px",
  },
  title: {
    margin: "0",
    fontSize: "16px",
    fontWeight: "bold",
  },
  description: {
    margin: "5px 0 0",
    fontSize: "14px",
    color: "#555",
  },
  image: {
    width: "50px",
    height: "50px",
    borderRadius: "4px",
  },
} as const;

export default NotificationCard;
