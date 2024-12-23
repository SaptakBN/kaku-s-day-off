import { DutyPattern } from "../enums/duty-pattern.enum";

export interface Schedule {
  date: string;
  duty: DutyPattern;
  dayOfTheWeek: string;
  month: string;
  day: string;
  year: string;
  startDay: number;
}
