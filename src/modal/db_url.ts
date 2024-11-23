/** @format */

export function DB_URL() {
  const apiUrl =
    process.env.NEXT_PUBLIC_DATABASE_URL ||
    "https://nipstec-alpha-service-fbeue3c0edgyarap.canadacentral-01.azurewebsites.net/api";
  return apiUrl;
}
