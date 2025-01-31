import "./App.css";
import dayjs from "dayjs";
import { getDutySchedule } from "./utils/services/duty.service";
import { DutyPattern } from "./utils/enums/duty-pattern.enum";
import { useState } from "react";
import { Schedule } from "./utils/interfaces/schedule.interface";

function App() {
  const [schedule, setSchedule] = useState<Schedule[][]>([]);
  const [dutyType, setDutyType] = useState<DutyPattern | null>(null);
  const getSchedule = (todayDuty: DutyPattern) => {
    setDutyType(todayDuty);
    const schedule = getDutySchedule(dayjs(), todayDuty);
    setSchedule(schedule);
  };
  const getColor = (duty: DutyPattern) => {
    switch (duty) {
      case DutyPattern.OFF:
        return "bg-green-400";
      case DutyPattern.Full_Day:
        return "bg-red-400";
      case DutyPattern.MORNING:
        return "bg-amber-400";
      case DutyPattern.NIGHT:
        return "bg-sky-400";
    }
  };
  const getDutyText = (duty: DutyPattern) => {
    switch (duty) {
      case DutyPattern.OFF:
        return "DAY OFF";
      case DutyPattern.Full_Day:
        return "FUll DUTY";
      case DutyPattern.MORNING:
        return "MORN DUTY";
      case DutyPattern.NIGHT:
        return "NIGHT DUTY";
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-cyan-500 md:p-5 md:m-5 p-2 m-2">Kaku's Day Off</h1>
      {!dutyType ? (
        <>
          <p className="text-2xl font-bold text-center text-pink-500 p-5 m-5">Choose your duty today</p>
          <div className="flex mx-auto lg:w-1/2 sm:w-full grid md:grid-cols-4 grid-cols-2">
            <button
              className={`p-2 font-bold  border border-4 border-green-200  m-1 rounded  ${
                dutyType === DutyPattern.OFF ? "bg-green-400 text-green-800" : "drop-shadow-xl bg-green-400 text-white"
              }`}
              onClick={() => getSchedule(DutyPattern.OFF)}
            >
              OFF DAY
            </button>
            <button
              className={`p-2 font-bold  border border-4 border-red-200  m-1 rounded  ${
                dutyType === DutyPattern.Full_Day ? "bg-red-400 text-red-800" : "drop-shadow-xl bg-red-400 text-white"
              }`}
              onClick={() => getSchedule(DutyPattern.Full_Day)}
            >
              FULL DUTY
            </button>
            <button
              className={`p-2 font-bold  border border-4 border-amber-200  m-1 rounded  ${
                dutyType === DutyPattern.MORNING
                  ? "bg-amber-400 text-amber-800"
                  : "drop-shadow-xl bg-amber-400 text-white"
              }`}
              onClick={() => getSchedule(DutyPattern.MORNING)}
            >
              MORNING DUTY
            </button>
            <button
              className={`p-2 font-bold  border border-4 border-sky-200  m-1 rounded  ${
                dutyType === DutyPattern.NIGHT ? "bg-sky-400 text-sky-800" : "drop-shadow-xl bg-sky-400 text-white"
              }`}
              onClick={() => getSchedule(DutyPattern.NIGHT)}
            >
              NIGHT DUTY
            </button>
          </div>
        </>
      ) : (
        <div>
          {schedule.map((month, index) => (
            <div className="md:m-4 m-2 flex flex-col gap-4" key={index}>
              <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-white-500 to-90% py-2 flex justify-between">
                <span className="lg:text-3xl text-lg text-white pl-4">{month[0].month}</span>
                <div className="flex gap-2 items-center">
                  <div className="lg:h-5 lg:w-5 h-3 w-3 bg-green-400 lg:text-3xl text-sm" /> <span>OFF</span>
                  <div className="lg:h-5 lg:w-5 h-3 w-3 bg-red-400 lg:text-3xl text-sm" /> <span>FULL</span>
                  <div className="lg:h-5 lg:w-5 h-3 w-3 bg-amber-400 lg:text-3xl text-sm" /> <span>MORNING</span>
                  <div className="lg:h-5 lg:w-5 h-3 w-3 bg-sky-400 lg:text-3xl text-sm" /> <span>NIGHT</span>
                </div>
              </div>
              <div className="grid grid-cols-7 grid-rows-1  md:gap-4 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"].map((day) => (
                  <div
                    className="bg-gradient-to-r from-sky-600 from-10% via-cyan-600 via-30% to-emerald-200 to-90% py-2 lg:text-xl text-sm text-white text-center"
                    key={day}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 md:gap-4 gap-2">
                {Array(month[0].startDay)
                  .fill(null)
                  .map((_, index) => (
                    <div key={`empty-${index}`} className="bg-gray-300 lg:h-[100px] h-[80px]"></div>
                  ))}

                {month.map((day) => (
                  <div
                    key={day.date}
                    className={`${getColor(
                      day.duty
                    )} lg:h-[100px] h-[80px] text-white lg:p-2 p-1 flex flex-col justify-between`}
                  >
                    <span className="mb-auto mr-auto lg:text-sm text-xs lg:block">{getDutyText(day.duty)}</span>
                    <span className="mt-auto ml-auto lg:text-6xl text-2xl">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
