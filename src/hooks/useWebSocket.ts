/** @format */

// hooks/useWebSocket.ts
import {useEffect, useState} from "react";
import {Client, IMessage} from "@stomp/stompjs";
import SockJS from "sockjs-client";

// Define the structure of the notification
export interface Notification {
  id: string; // Optional: Add fields based on your backend data
  message: string;
  timestamp?: string;
}

export const useWebSocket = (url: string, topic: string): Notification[] => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const socket = new SockJS(url);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
    });

    stompClient.onConnect = () => {
      console.log("Connected to WebSocket");
      stompClient.subscribe(topic, (message: IMessage) => {
        const notification: Notification = JSON.parse(message.body);
        setNotifications((prev) => [...prev, notification]);
      });
    };

    stompClient.activate();

    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
        console.log("Disconnected from WebSocket");
      }
    };
  }, [url, topic]);

  return notifications;
};
