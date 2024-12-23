import dayjs, { Dayjs } from "dayjs";
import { DutyPattern } from "../enums/duty-pattern.enum";
import dutyJson from "../../assets/dutyPattern.json";
import { Schedule } from "../interfaces/schedule.interface";

export const getDutySchedule = (startDate: Dayjs, todayDuty: DutyPattern) => {
  const dutyPattern: ReadonlyArray<DutyPattern> = dutyJson["duty-pattern"] as DutyPattern[];
  const todayIndex = dutyPattern.indexOf(todayDuty);

  if (todayIndex === -1) {
    throw new Error("Invalid duty type. Valid types are: off, morning, full day, night.");
  }

  const schedule: Schedule[] = [];
  let currentDay = dayjs(startDate);

  for (let i = 0; i < 365; i++) {
    const dutyIndex = (todayIndex + i) % dutyPattern.length;
    schedule.push({
      date: currentDay.format("YYYY-MM-DD"),
      duty: dutyPattern[dutyIndex],
      dayOfTheWeek: currentDay.format("dddd"),
    });
    currentDay = currentDay.add(1, "day");
  }

  return schedule;
};
