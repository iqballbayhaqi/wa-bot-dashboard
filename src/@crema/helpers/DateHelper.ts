import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat"; // load on demand
import relativeTime from "dayjs/plugin/relativeTime"; // load on demand
import moment from "moment";

dayjs.extend(AdvancedFormat); // use plugin
dayjs.extend(relativeTime); // use plugin

export const getDateObject = (dateObject?: string | dayjs.Dayjs) => {
  if (dateObject) return dayjs(dateObject);
  return dayjs();
};

export const getCurrentMonthDate = (date: number, format = "MMM DD,YYYY") => {
  if (date) return dayjs().date(date).format(format);

  return dayjs().format(format);
};

export const getFormattedDate = (
  dateObject?: string | dayjs.Dayjs,
  format = "MMM DD,YYYY"
) => {
  if (dateObject) return dayjs(dateObject).format(format);
  return "";
};

export const getFormattedDateTime = (
  value = 0,
  unit = "days",
  format = "MMM DD,YYYY"
) => {
  if (value === 0) {
    return dayjs().format(format);
  } else {
    // @ts-ignore
    return dayjs().add(value, unit).format(format);
  }
};

export const timeFromNow = (date: string) => {
  const timestamp = dayjs(date).format("X");
  const newDate = dayjs.unix(Number(timestamp));
  return dayjs(newDate).fromNow();
};

export const getTimeFromNow = (date: string) => {
  const timestamp = dayjs(date).format("X");
  const newDate = dayjs.unix(Number(timestamp));
  return dayjs(newDate).fromNow();
};

export const getYearlyRange = (): [number, number] => {
  const year: number = moment().year();
  // Start of the month
  const startOfMonth = moment(`${year}-01-01`).startOf("month").valueOf();

  // End of the month
  const endOfMonth = moment(`${year}-12-31`).endOf("month").valueOf();

  return [startOfMonth, endOfMonth];
};

export const getMonthlyRange = (
  month: number = moment().month() + 1
): [number, number] => {
  const year: number = moment().year();
  // Start of the month
  const startOfMonth = moment(`${year}-${month.toString().padStart(2, "0")}-01`)
    .startOf("month")
    .valueOf();

  // End of the month
  const endOfMonth = moment(`${year}-${month.toString().padStart(2, "0")}-31`)
    .endOf("month")
    .valueOf();

  return [startOfMonth, endOfMonth];
};

export const filterDatesInRange = (
  datas: any[],
  startDate: string,
  endDate: string
) => {
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);

  return datas.filter((data) => {
    const dateMoment = moment(data.startDate);
    return dateMoment.isBetween(startMoment, endMoment);
  });
};
