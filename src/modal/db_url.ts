/** @format */

export function DB_URL() {
  const apiUrl =
    process.env.NEXT_PUBLIC_DATABASE_URL ||
    "https://nipstec-alpha-service-fbeue3c0edgyarap.canadacentral-01.azurewebsites.net/api";
  // return "http://localhost:8080/api";
  return apiUrl;
}

export function notification_url() {
  const apiUrl =
    process.env.NEXT_PUBLIC_NOTIFICATION_URL ||
    "https://nipstec-alpha-service-fbeue3c0edgyarap.canadacentral-01.azurewebsites.net";
  return apiUrl;
}
