/** @format */

// pages/admin/notifications.tsx
import {useWebSocket, Notification} from "@/hooks/useWebSocket";
import React from "react";

const NotificationsPage: React.FC = () => {
  const notifications = useWebSocket(
    "http://localhost:8090/ws", // Replace with your backend WebSocket URL
    "/topic/notifications" // Replace with your backend topic
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Notifications</h1>
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications yet.</p>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={index}
              className="p-4 bg-blue-100 border border-blue-300 rounded-md">
              <p className="font-semibold">{notification.message}</p>
              {notification.timestamp && (
                <p className="text-xs text-gray-500">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
