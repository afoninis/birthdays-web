import { useCallback, useEffect, useState } from "react";
import "./App.css";
import BirthdaysList from "./Components/BirthdaysList";
import UpcomingBirthday from "./Components/UpcomingBirthday";
import { birthdays } from "./test_data";
import { getTargetYear } from "./Components/Helpers";

function App() {
  const [data, setData] = useState(birthdays);

  const recalculateDaysTill = useCallback(() => {
    setData((data) => {
      return data.map((targetItem) => {
        const currentDateInMS = new Date().getTime();
        const targetDateInMS = new Date(
          getTargetYear(targetItem.day, targetItem.month),
          targetItem.month,
          targetItem.day
        ).getTime();

        return {
          ...targetItem,
          days_till: Math.round(
            (targetDateInMS - currentDateInMS) / 1000 / 60 / 60 / 24
          ),
        };
      });
    });
  }, []);

  useEffect(() => {
    recalculateDaysTill();
  }, [recalculateDaysTill]);

  return (
    <div className="App">
      <div className="container">
        <UpcomingBirthday data={data} />
        <BirthdaysList data={data} />
        <button
          onClick={() => {
            console.log(data[1]);
          }}
        >
          tatarin
        </button>
      </div>
    </div>
  );
}

export default App;
