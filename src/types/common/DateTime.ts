export interface DateTime {
  year: number;
  month: number;
  dayOfMonth: number;
  hourOfDay: number;
  minute: number;
  second: number;
}

// Convert a DateTime object to a string
export function formatDateTime(dateTime: DateTime): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { year, month, dayOfMonth, hourOfDay, minute, second } = dateTime;
  const formattedDate = `${year} ${monthNames[month]} ${dayOfMonth}, ${hourOfDay}:${minute}:${second}`;

  return formattedDate;
}

// Convert date to a DateTime object
export function parseDateTime(date: Date): DateTime {
  const year = date.getFullYear();
  const month = date.getMonth();
  const dayOfMonth = date.getDate();
  const hourOfDay = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return {
    year,
    month,
    dayOfMonth,
    hourOfDay,
    minute,
    second,
  };
}

// Compare two DateTime objects
export function compareDates(
  dateTime1: DateTime,
  dateTime2: DateTime
): boolean {
  const { year, month, dayOfMonth } = dateTime1;
  const { year: year2, month: month2, dayOfMonth: dayOfMonth2 } = dateTime2;

  return year === year2 && month === month2 && dayOfMonth === dayOfMonth2;
}
