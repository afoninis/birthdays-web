import "./BirthdaysList.css";
import menuIcon from "../Assets/Images/menu.svg";
import editIcon from "../Assets/Images/edit.svg";
import detailsIcon from "../Assets/Images/details.svg";
import { useCallback, useEffect, useState } from "react";
import { birthdays } from "../test_data";

const BirthdaysList = ({ data }) => {
  return (
    <section className="birthdays-list">
      <div className="birthdays-list-header">
        <p className="birthdays-list-header--title">Birthdays list</p>
        <div className="birthdays-list-header--controls">
          <div className="birthdays-list-header--controls-icon">
            <img
              src={menuIcon}
              className="birthdays-list-header--image"
              alt="Menu icon"
              title="Menu"
            />
          </div>
          <div className="birthdays-list-header--controls-icon">
            <img
              src={editIcon}
              className="birthdays-list-header--image"
              alt="Edit icon"
              title="Edit"
            />
          </div>
        </div>
      </div>
      <div className="birthdays-list-content">
        {data.map((item, index) => {
          const birthdayProgress = `${(1 - item?.["days_till"] / 365) * 100}%`;

          const getProgressValue = () => {
            if (item?.["days_till"] <= 14) return "close";
            else if (item?.["days_till"] > 14 && item?.["days_till"] <= 90)
              return "soon";
            else if (item?.["days_till"] > 90 && item?.["days_till"] <= 366)
              return "safe";
          };

          return (
            <div key={index} className="birthdays-list-content--item">
              <div className="birthdays-list-content--left">
                <div className="birthdays-list-content--person">
                  <h4 className="birthdays-list-content--name">
                    {item?.["name"]} {item?.["surname"]}{" "}
                    {item?.["username"] && `(${item?.["username"]})`}
                  </h4>
                  <h5 className="birthdays-list-content--date">
                    {item?.["day"]}.{item?.["month"]}
                  </h5>
                </div>
                <div className="birthdays-list-content--icon">
                  <img
                    className="birthdays-list-content--image"
                    src={detailsIcon}
                    alt="Details icon"
                    title="Details"
                  />
                </div>
              </div>
              <div
                className={`birthdays-list-content--right ${getProgressValue()}`}
              >
                <div
                  className={`birthdays-list-content--progress ${getProgressValue()}`}
                  style={{ width: birthdayProgress }}
                ></div>
                <p className="birthdays-list-content--days">
                  {item?.["days_till"]}{" "}
                  {item?.["days_till"] === 1 ? "day" : "days"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BirthdaysList;
