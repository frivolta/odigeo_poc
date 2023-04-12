export const convertDateToMilliseconds = (date: Date): number => {
  return date.getTime();
};

export const convertMillisecondsToDate = (milliseconds: string): Date => {
  return new Date(parseInt(milliseconds));
};
