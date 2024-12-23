import dayjs, { Dayjs } from "dayjs";
import { Schedule } from "../interfaces/schedule.interface";
import { DutyPattern } from "../enums/duty-pattern.enum";
import dutyJson from "../../assets/dutyPattern.json";

export const getDutySchedule = (startDate: Dayjs, todayDuty: DutyPattern): Schedule[][] => {
  const dutyPattern: ReadonlyArray<DutyPattern> = dutyJson["duty-pattern"] as DutyPattern[];
  const todayIndex = dutyPattern.indexOf(todayDuty);

  if (todayIndex === -1) {
    alert("Invalid duty type. Valid types are: off, morning, full day, night.");
    return [];
  }

  const schedule: Schedule[][] = [];
  const startOfMonth = dayjs(startDate).startOf("month");
  const todayDate = dayjs(startDate);
  const daysDifference = todayDate.diff(startOfMonth, "day");

  // Derive the duty at the start of the month
  const startMonthDutyIndex =
    (todayIndex - (daysDifference % dutyPattern.length) + dutyPattern.length) % dutyPattern.length;
  const startMonthDuty = dutyPattern[startMonthDutyIndex];

  console.log(`Start of the month duty: ${startMonthDuty}`);

  let currentDay = startOfMonth;

  for (let i = 0; i < 396; i++) {
    const dutyIndex = (startMonthDutyIndex + i) % dutyPattern.length;
    const prevDayMonth = dayjs(currentDay).subtract(1, "day").month();
    const currentDayMonth = dayjs(currentDay).month();

    if (prevDayMonth !== currentDayMonth) {
      schedule.push([]);
    }

    schedule[schedule.length - 1].push({
      startDay: currentDay.day(),
      date: currentDay.format("DD, dddd"),
      duty: dutyPattern[dutyIndex],
      dayOfTheWeek: currentDay.format("dddd"),
      month: currentDay.format("MMMM"),
      day: currentDay.format("DD"),
      year: currentDay.format("YYYY"),
    });

    currentDay = currentDay.add(1, "day");
  }
  console.log(schedule);
  return schedule;
};
