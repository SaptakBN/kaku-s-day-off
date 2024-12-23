import "./App.css";
import dayjs from "dayjs";
import { getDutySchedule } from "./utils/services/duty.service";
import { DutyPattern } from "./utils/enums/duty-pattern.enum";
import { useState } from "react";
import { Schedule } from "./utils/interfaces/schedule.interface";

function App() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const getSchedule = (todayDuty: DutyPattern) => {
    const schedule = getDutySchedule(dayjs(), todayDuty);
    setSchedule(schedule);
  };

  return (
    <div>
      <button onClick={() => getSchedule(DutyPattern.OFF)}>OFF</button>
      <button onClick={() => getSchedule(DutyPattern.Full_Day)}>Full</button>
      <button onClick={() => getSchedule(DutyPattern.MORNING)}>Morning</button>
      <button onClick={() => getSchedule(DutyPattern.NIGHT)}>Night</button>
      <div>{JSON.stringify(schedule)}</div>
    </div>
  );
}

export default App;
