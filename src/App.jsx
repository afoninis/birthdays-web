import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import BirthdaysList from "./Components/BirthdaysList";
import UpcomingBirthday from "./Components/UpcomingBirthday";
import { birthdays } from "./test_data";
// import { birthdays } from "./my_data";
import {
  convertStringMonthToNumber,
  getTargetYear,
  sortByDateIncrease,
} from "./Components/Helpers";

function App() {
  const [data, setData] = useState(birthdays);

  const updateData = useCallback(() => {
    return setData((data) =>
      data.map((item, index) => {
        return { ...item, id: index };
      })
    );
  }, []);

  const recalculateDaysTill = useCallback(() => {
    setData((data) => {
      return data.map((targetItem, index) => {
        if (typeof targetItem.month === "string")
          targetItem.month = convertStringMonthToNumber(targetItem.month);
        const currentDateInMS = new Date().getTime();
        const targetDateInMS = new Date(
          getTargetYear(targetItem.day, targetItem.month),
          targetItem.month,
          targetItem.day
        ).getTime();

        return {
          ...targetItem,
          id: index,
          days_till: Math.ceil(
            (targetDateInMS - currentDateInMS) / 1000 / 60 / 60 / 24
          ),
        };
      });
    });
    console.log(1);
  }, []);

  useEffect(() => {
    recalculateDaysTill();
    setData((data) => {
      return sortByDateIncrease(data);
    });
    updateData();
  }, [recalculateDaysTill]);

  return (
    <div className="App">
      <div className="container">
        <UpcomingBirthday data={data} />
        <BirthdaysList data={data} setData={setData} updateData={updateData} />
      </div>
    </div>
  );
}

export default App;
