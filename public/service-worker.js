/** @format */

self.addEventListener("push", (event) => {
  const data = event.data ? JSON.parse(event.data.text()) : {};
  self.registration.showNotification("New Student Added", {
    body: `${data.firstname} ${data.lastname}`,
    icon: "/nipstec-logo.webp", // Path to your notification icon
  });
});
