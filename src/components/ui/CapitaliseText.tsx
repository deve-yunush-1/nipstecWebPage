/** @format */

import {sourceMapsEnabled} from "process";

export function CapitalizeFirstLetter({
  text,
  className = "", // Default to an empty string if className is not provided
}: {
  text: string | null;
  className?: string; // Make className optional
}) {
  if (text === null) return null; // Return null if text is null

  const name = text
    .split(" ")
    .map((t) => t.charAt(0).toLocaleUpperCase() + t.substr(1).toLowerCase())
    .join(" ");

  return <div className={className}>{name}</div>; // Apply the className to the div
}
