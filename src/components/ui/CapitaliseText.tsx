/** @format */

import {sourceMapsEnabled} from "process";

export function CapitalizeFirstLetter({text}: {text: string | null}) {
  if (text === null) return;
  const name = text
    .split(" ")
    .map((t, i) => t.charAt(0).toLocaleUpperCase() + t.substr(1).toLowerCase())
    .join(" ");
  return <div>{name}</div>;
}
