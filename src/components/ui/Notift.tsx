/** @format */

import NotificationCard from "./NotificationCompo";

export const Notify = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <NotificationCard
        title="New Update Available"
        description="Click here to download the latest version."
        image="/nipstec-logo.webp"
        icon="/nipstec-fav-icon.png"
      />
    </div>
  );
};
