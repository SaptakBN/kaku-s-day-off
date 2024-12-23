import dayjs, { Dayjs } from "dayjs";
import { DutyPattern } from "../enums/duty-pattern.enum";
import dutyJson from "../../assets/dutyPattern.json";
import { Schedule } from "../interfaces/schedule.interface";

export const getDutySchedule = (startDate: Dayjs, todayDuty: DutyPattern): Schedule[][] => {
  const dutyPattern: ReadonlyArray<DutyPattern> = dutyJson["duty-pattern"] as DutyPattern[];
  const todayIndex = dutyPattern.indexOf(todayDuty);

  if (todayIndex === -1) {
    alert("Invalid duty type. Valid types are: off, morning, full day, night.");
  }

  const schedule: Schedule[][] = [];
  const todayDate = dayjs(startDate).startOf("month").format("YYYY-MM-DD");

  let currentDay = dayjs(todayDate);

  for (let i = 0; i < 365; i++) {
    const dutyIndex = (todayIndex + i) % dutyPattern.length;
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
