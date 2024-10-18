import dayjs from "dayjs";

export function formatDate(date: Date | undefined): string | undefined {
  if (!date) return undefined;
  return dayjs(date).format("YYYY-MM-DD");
}
