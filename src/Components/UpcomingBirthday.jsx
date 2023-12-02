import "./UpcomingBirthday.css";
import { getTargetYear } from "./Helpers";
import { useEffect, useState } from "react";

const UpcomingBirthday = ({ data, updateData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  let filteredData = [];
  for (let i = 0; i < (data.length > 5 ? 5 : data.length); i++) {
    filteredData.push(data[i]);
  }

  const getSlidePosition = (index) => {
    let slidePosition = "nextSlide";
    if (currentSlide === index) return "currentSlide";
    else if (
      index === currentSlide - 1 ||
      (currentSlide === 0 && index === filteredData.length - 1)
    )
      return "prevSlide";
    return slidePosition;
  };

  useEffect(() => {
    updateData();
  }, [updateData]);

  return (
    <section className="upcoming-birthday">
      <div className="upcoming-birthday-list">
        {filteredData.map((item, index) => {
          const slidePosition = getSlidePosition(index);
          return (
            <div
              className={`upcoming-birthday-item ${slidePosition} ${
                item.days_till === 0 ? "birthday-today" : ""
              }`}
              key={item.id}
            >
              <h4 className="upcoming-birthday-tag">Upcoming birthday</h4>
              <div className="upcoming-birthday-content">
                <h3 className="upcoming-birthday-content--name">
                  {item?.["name"]} {item?.["surname"]}
                </h3>
                <h5 className="upcoming-birthday-content--days">
                  {`${
                    item?.["days_till"] === 0
                      ? "today"
                      : item?.["days_till"] === 1
                      ? "1 day"
                      : `${item?.["days_till"]} days`
                  }`}
                </h5>
              </div>
              <h6 className="upcoming-birthday-date">
                {item?.["day"]}.{item?.["month"] + 1}.
                {getTargetYear(item?.["day"], item?.["month"])}
              </h6>
              <div className="upcoming-birthday-arrows">
                <button
                  className="upcoming-birthday-arrows-left"
                  onClick={() => {
                    setCurrentSlide((index) => {
                      if (index === 0) return filteredData.length - 1;
                      else return index - 1;
                    });
                  }}
                >
                  <span>&#10094;</span>
                </button>
                <button
                  className="upcoming-birthday-arrows-right"
                  onClick={() =>
                    setCurrentSlide((index) => {
                      if (index === filteredData.length - 1) return 0;
                      else return index + 1;
                    })
                  }
                >
                  <span>&#10095;</span>
                </button>
              </div>
              <div className="upcoming-birthday-dots">
                {filteredData.map((item, index) => {
                  const slidePosition = getSlidePosition(index);
                  return (
                    <button
                      className={`upcoming-birthday-dots-dot ${slidePosition}`}
                      key={item.id}
                      onClick={() => {
                        setCurrentSlide(index);
                      }}
                    >
                      <span>&#11044;</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UpcomingBirthday;
