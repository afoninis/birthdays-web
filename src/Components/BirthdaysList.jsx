import "./BirthdaysList.css";
import menuIcon from "../Assets/Images/menu.svg";
import detailsIcon from "../Assets/Images/details.svg";
import starEmpty from "../Assets/Images/star-empty.svg";
import starFilled from "../Assets/Images/star-filled.svg";
import BirthdayInfoPopup from "./BirthdayInfoPopup";
import React, { useEffect, useState } from "react";
import {
  getTargetYear,
  sortByDateDecrease,
  sortByDateIncrease,
  sortByImportantFirst,
  sortByImportantOnly,
  sortByName,
} from "./Helpers";

const BirthdaysList = React.memo(({ data, setData, updateData }) => {
  const [popupInfoIndex, setPopupInfoIndex] = useState(0);
  const [showPopupInfo, setShowPopupInfo] = useState(0);
  const [isBirthdayPopupVisible, setIsBirthdayPopupVisible] = useState(false);
  const [isSortVisible, setIsSortVisible] = useState(0);
  const [additionalInfoIndex, setAdditionalInfoIndex] = useState(-1);
  const [sortingFilters, setSortingFilters] = useState([
    {
      id: 0,
      title: "By date",
      filters: ["Increase", "Decrease"],
      currentChoice: "Increase",
      isSelected: true,
    },
    {
      id: 1,
      title: "By name",
      filters: ["A-Z"],
      currentChoice: "A-Z",
      isSelected: false,
    },
  ]);
  const [isMenuAnimated, setIsMenuAnimated] = useState(0);
  const [isImportantOnlyChecked, setIsImportantOnlyChecked] = useState(0);
  const [isImportantFirstChecked, setIsImportantFirstChecked] = useState(0);

  const [currentSortFilter, setCurrentSortFilter] = useState(
    sortingFilters?.[0]?.currentChoice
  );
  const [dataBeforeFiltered, setDataBeforeFiltered] = useState(0);
  const [filterBeforeSwitch, setFilterBeforeSwitch] = useState(0);

  const setFavorite = (index) => {
    setData((data) => {
      return data.map((item) => {
        return item.id === index ? { ...item, favorite: true } : item;
      });
    });
  };
  const unsetFavorite = (index) => {
    setData((data) => {
      return data.map((item) => {
        return item.id === index ? { ...item, favorite: false } : item;
      });
    });
  };

  const showAdditionalInfo = (index) => {
    setAdditionalInfoIndex(index);
  };

  const hideAdditionalInfo = (index) => {
    setAdditionalInfoIndex(-1);
  };

  const changeFilterCurrentChoice = (targetItem) => {
    if (isImportantFirstChecked) return;
    return setSortingFilters((sortingFilters) => {
      return sortingFilters.map((item) => {
        if (targetItem === item) {
          const currentChoiceIndex = item?.filters?.findIndex(
            (el) => el === item.currentChoice
          );
          let resultSortFilter = "";
          let resultItem;
          if (currentChoiceIndex + 1 < item?.filters?.length) {
            resultSortFilter = item?.filters?.[currentChoiceIndex + 1];
            resultItem = {
              ...item,
              currentChoice: item?.filters?.[currentChoiceIndex + 1],
            };
          } else if (currentChoiceIndex === item?.filters?.length - 1) {
            resultSortFilter = item?.filters?.[0];
            resultItem = {
              ...item,
              currentChoice: item?.filters?.[0],
            };
          }
          if (!targetItem.isSelected) return resultItem;
          setCurrentSortFilter(resultSortFilter);
          return resultItem;
        }
        return item;
      });
    });
  };

  const changeSelectedFilter = (targetItem, e) => {
    if (e.target.classList.contains("birthdays-list-header--sort-value"))
      return;
    if (isImportantFirstChecked) return;
    setSortingFilters((sortingFilters) => {
      return sortingFilters.map((item) => {
        if (item === targetItem) {
          setCurrentSortFilter(item.currentChoice);
          return { ...item, isSelected: true };
        } else return { ...item, isSelected: false };
      });
    });
  };

  const playMenuAnimation = () => {
    setIsMenuAnimated(true);
    const menuFlipInterval = setInterval(() => {
      setIsMenuAnimated(false);
      clearInterval(menuFlipInterval);
    }, 3000);
  };

  const switchImportantOnly = () => {
    if (isImportantFirstChecked) return;
    setIsImportantOnlyChecked(
      (isImportantOnlyChecked) => !isImportantOnlyChecked
    );

    if (isImportantOnlyChecked) {
      setCurrentSortFilter(sortingFilters?.[0]?.currentChoice);
      setData(dataBeforeFiltered);
    } else {
      setCurrentSortFilter("ImportantOnly");
    }
  };
  const switchImportantFirst = () => {
    if (isImportantOnlyChecked) return;
    setIsImportantFirstChecked(
      (isImportantFirstChecked) => !isImportantFirstChecked
    );
    if (isImportantFirstChecked) {
      setCurrentSortFilter(sortingFilters?.[0]?.currentChoice);
    } else {
      setFilterBeforeSwitch(currentSortFilter);
      setCurrentSortFilter("ImportantFirst");
    }
  };

  useEffect(() => {
    switch (currentSortFilter) {
      case "Increase": {
        sortByDateIncrease(data);
        break;
      }
      case "Decrease": {
        sortByDateDecrease(data);
        break;
      }
      case "A-Z": {
        sortByName(data);
        break;
      }
      case "ImportantOnly": {
        setDataBeforeFiltered(data);
        setData((data) => sortByImportantOnly(data));
        break;
      }
      case "ImportantFirst": {
        setData((data) => sortByImportantFirst(data, filterBeforeSwitch));
        break;
      }
      default: {
        sortByDateIncrease(data);
        break;
      }
    }
    updateData();
  }, [currentSortFilter, updateData]);

  return (
    <section className="birthdays-list">
      <div className="birthdays-list-header">
        <p className="birthdays-list-header--title">Birthdays list</p>
        <div className="birthdays-list-header--controls">
          <div className="birthdays-list-header--controls-icon">
            <div
              className={`birthdays-list-header--sort ${
                isSortVisible ? "checked" : ""
              }`}
            >
              <h3 className="birthdays-list-header--sort-heading">Sorting</h3>
              <div className="birthdays-list-header--sort-content">
                {sortingFilters.map((item) => {
                  return (
                    <div
                      className={`birthdays-list-header--sort-item ${
                        item.isSelected ? "selected" : ""
                      }`}
                      key={item.id}
                      onClick={(e) => changeSelectedFilter(item, e)}
                    >
                      <p className="birthdays-list-header--sort-title">
                        {item.title}
                      </p>
                      <div
                        className="birthdays-list-header--sort-value"
                        onClick={() => changeFilterCurrentChoice(item)}
                      >
                        {item.currentChoice}
                      </div>
                    </div>
                  );
                })}
                <div className="birthdays-list-header--sort-checkbox-wrapper">
                  <div
                    className={`birthdays-list-header--sort-checkbox ${
                      isImportantFirstChecked ? "checked" : ""
                    }`}
                    onClick={() => switchImportantFirst()}
                  ></div>
                  <p
                    className="birthdays-list-header--sort-checkbox-text"
                    onClick={() => switchImportantFirst()}
                  >
                    Important first
                  </p>
                </div>
                <div className="birthdays-list-header--sort-checkbox-wrapper">
                  <div
                    className={`birthdays-list-header--sort-checkbox ${
                      isImportantOnlyChecked ? "checked" : ""
                    }`}
                    onClick={() => switchImportantOnly()}
                  ></div>
                  <p
                    className="birthdays-list-header--sort-checkbox-text"
                    onClick={() => switchImportantOnly()}
                  >
                    Important only
                  </p>
                </div>
              </div>
            </div>
            <img
              src={menuIcon}
              className={`birthdays-list-header--image ${
                isMenuAnimated ? "menu-flip" : ""
              }`}
              alt="Menu icon"
              title="Menu"
              onClick={() => {
                setIsSortVisible((isSortVisible) => !isSortVisible);
                playMenuAnimation();
              }}
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
                  <div className="birthdays-list-content--info">
                    <h4 className="birthdays-list-content--name">
                      {item?.["surname"]
                        ? `${item?.["name"]} ${item?.["surname"]} `
                        : item?.["name"]}
                    </h4>
                    <div
                      className="birthdays-list-content--star"
                      onClick={() =>
                        item?.["favorite"]
                          ? unsetFavorite(index)
                          : setFavorite(index)
                      }
                    >
                      {item?.["favorite"] ? (
                        <img
                          src={starFilled}
                          className="birthdays-list-content--star-true"
                          alt="Favorite icon"
                        />
                      ) : (
                        <img
                          src={starEmpty}
                          alt="Favorite icon"
                          className="birthdays-list-content--star-false"
                        />
                      )}
                    </div>
                  </div>
                  <h5 className="birthdays-list-content--date">
                    {item?.["day"]}.{item?.["month"] + 1}.
                    {getTargetYear(item?.["day"], item?.["month"])}
                  </h5>
                </div>
                <div
                  className="birthdays-list-content--icon"
                  onMouseOver={() => showAdditionalInfo(index)}
                  onMouseOut={() => hideAdditionalInfo(index)}
                  onClick={() => {
                    setShowPopupInfo(1);
                    setPopupInfoIndex(index);
                    setIsBirthdayPopupVisible(item?.["favorite"]);
                  }}
                >
                  <p
                    className={`birthdays-list-content--additional-info ${
                      additionalInfoIndex === index && "show"
                    }`}
                    onClick={() => {
                      setShowPopupInfo(1);
                      setPopupInfoIndex(index);
                      setIsBirthdayPopupVisible(item?.["favorite"]);
                    }}
                  >
                    Show additional info.
                  </p>
                  <img
                    className="birthdays-list-content--image"
                    src={detailsIcon}
                    alt="Details icon"
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
                  {`${
                    item?.["days_till"] === 0
                      ? "today"
                      : item?.["days_till"] === 1
                      ? "1 day"
                      : `${item?.["days_till"]} days`
                  }`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <BirthdayInfoPopup
        data={data}
        popupInfoIndex={popupInfoIndex}
        showPopupInfo={showPopupInfo}
        setShowPopupInfo={setShowPopupInfo}
        isBirthdayPopupVisible={isBirthdayPopupVisible}
        setIsBirthdayPopupVisible={setIsBirthdayPopupVisible}
        setFavorite={setFavorite}
        unsetFavorite={unsetFavorite}
      />
    </section>
  );
});

export default BirthdaysList;
