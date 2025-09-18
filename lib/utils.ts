import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parse } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const converDateToVietnameseFormat = (dateString: string) => {
  if (!dateString) return "";
  const date = parse(dateString, "dd/MM/yyyy", new Date());
  const day = format(date, "dd");
  const month = format(date, "MM");
  const year = format(date, "yyyy");
  return `ngày ${day} tháng ${month} năm ${year}`;
};
