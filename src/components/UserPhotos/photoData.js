import ouster from "../../images/ouster.jpg";
import malcolm1 from "../../images/malcolm1.jpg";
import malcolm2 from "../../images/malcolm2.jpg";
import ripley1 from "../../images/ripley1.jpg";
import ripley2 from "../../images/ripley2.jpg";
import kenobi1 from "../../images/kenobi1.jpg";
import kenobi2 from "../../images/kenobi2.jpg";
import kenobi3 from "../../images/kenobi3.jpg";
import kenobi4 from "../../images/kenobi4.jpg";
import took1 from "../../images/took1.jpg";
import took2 from "../../images/took2.jpg";
import ludgate1 from "../../images/ludgate1.jpg";

export const PHOTO_SRC_BY_FILE = {
  "ouster.jpg": ouster,
  "malcolm1.jpg": malcolm1,
  "malcolm2.jpg": malcolm2,
  "ripley1.jpg": ripley1,
  "ripley2.jpg": ripley2,
  "kenobi1.jpg": kenobi1,
  "kenobi2.jpg": kenobi2,
  "kenobi3.jpg": kenobi3,
  "kenobi4.jpg": kenobi4,
  "took1.jpg": took1,
  "took2.jpg": took2,
  "ludgate1.jpg": ludgate1,
};

export function parseModelDate(value) {
  if (value == null) return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const normalized = String(value).includes("T")
    ? String(value)
    : String(value).replace(" ", "T");
  const date = new Date(normalized);

  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatFriendlyDateTime(value) {
  const date = parseModelDate(value);

  if (!date) {
    return "Unknown date";
  }

  return date.toLocaleString(undefined, {
    dateStyle: "long",
    timeStyle: "short",
  });
}
