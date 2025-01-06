// import { clsx } from "clsx";
// import { twMerge } from "tailwind-merge"
//
// export function cn(...inputs) {
//   return twMerge(clsx(inputs));
// }

export function DateFormatter(date) {

  const requestDate = new Date(date);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(requestDate);

  return formattedDate;
}
