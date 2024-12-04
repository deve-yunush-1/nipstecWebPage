/** @format */

// hooks/useWebSocket.ts
import {useEffect, useState} from "react";
import {Client, IMessage} from "@stomp/stompjs";
import SockJS from "sockjs-client";

// Define the structure of the notification
export interface Notifications {
  id: string; // Optional: Add fields based on your backend data
  message: string;
  firstname: string;
  lastname: string;
  timestamp?: string;
}

export const useWebSocket = (url: string, topic: string): Notifications[] => {
  const [notifications, setNotifications] = useState<Notifications[]>([]);

  useEffect(() => {
    // Request Notification permission if not granted
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const socket = new SockJS(url);
    const stompClient = new Client({
      webSocketFactory: () => socket,
    });

    stompClient.onConnect = () => {
      stompClient.subscribe(topic, (message: IMessage) => {
        const notification: Notifications = JSON.parse(message.body);

        // Update the state with the new notification
        setNotifications((prev) => [...prev, notification]);

        // Trigger browser notification if permission is granted
        if (Notification.permission === "granted") {
          // Debounce to ensure a notification is displayed distinctly
          const notification_message =
            notification.firstname + " " + notification.lastname;
          setTimeout(() => {
            new Notification("New student added", {
              // badge: "/nipstec-logo.webp",
              body: notification_message,
              icon: "/nipstec-logo.webp",
            });
          }, 500);
        }
      });
    };
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        });
    }

    stompClient.activate();

    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
      }
    };
  }, [url, topic]);

  return notifications;
};
