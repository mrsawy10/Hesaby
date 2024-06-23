"use client";

export default function truncateText(text: string, limit: number) {
  // Split the text into an array of words
  const words = typeof text == `string` ? text.split(" ") : [];

  // If the number of words is less than or equal to the limit, return the original text
  if (words.length <= limit) {
    return text;
  }

  // Otherwise, concatenate the first 'limit' words and add an ellipsis
  return words?.slice(0, limit)?.join(" ") + "...";
}
