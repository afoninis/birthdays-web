import "./UpcomingBirthday.css";
import { getTargetYear } from "./Helpers";

const UpcomingBirthday = ({ data }) => {
  return (
    <section className="upcoming-birthday">
      <h4 className="upcoming-birthday-tag">Upcoming birthday</h4>
      <div className="upcoming-birthday-content">
        <h3 className="upcoming-birthday-content--name">
          {data?.[0]?.["name"]} {data?.[0]?.["surname"]}
        </h3>
        <h5 className="upcoming-birthday-content--days">
          {data?.[0]?.["days_till"]}{" "}
          {data?.[0]?.["days_till"] === 1 ? "day" : "days"}
        </h5>
      </div>
      <h6 className="upcoming-birthday-date">
        {data?.[0]?.["day"]}.{data?.[0]?.["month"]}.
        {getTargetYear(data?.[0]?.["day"], data?.[0]?.["month"])}
      </h6>
    </section>
  );
};

export default UpcomingBirthday;
