import "./BirthdayInfoPopup.css";
import { getTargetYear } from "./Helpers";

const BirthdayInfoPopup = ({
  data,
  popupInfoIndex,
  showPopupInfo,
  setShowPopupInfo,
  isBirthdayPopupVisible,
  setIsBirthdayPopupVisible,
  setFavorite,
  unsetFavorite,
}) => {
  const hidePopupInfo = () => {
    setShowPopupInfo(0);
  };

  return (
    <div className={`popup-info ${showPopupInfo && "show"}`}>
      <div className="popup-info-bg" onClick={hidePopupInfo}></div>
      <div className="popup-info-container">
        <button className="popup-info-close" onClick={hidePopupInfo}>
          x
        </button>

        <div className="popup-info-item">
          <p className="popup-info-item--title">Name</p>
          <p className="popup-info-item--name">
            {`${data?.[popupInfoIndex]?.name} ${data?.[popupInfoIndex]?.surname}`}
          </p>
        </div>

        <div className="popup-info-item">
          <p className="popup-info-item--title">Date</p>
          <p className="popup-info-item--date">
            <span className="popup-info-item--date-bg">
              {data?.[popupInfoIndex]?.day}
            </span>
            :
            <span className="popup-info-item--date-bg">
              {data?.[popupInfoIndex]?.month}
            </span>
            :
            <span className="popup-info-item--date-bg">
              {getTargetYear(
                data?.[popupInfoIndex]?.day,
                data?.[popupInfoIndex]?.month
              )}
            </span>
          </p>
        </div>

        <div className="popup-info-item">
          <div className="popup-info-item--checkbox-wrapper">
            <div
              className={`popup-info-item--checkbox ${
                isBirthdayPopupVisible ? "checked" : ""
              }`}
              onClick={() => {
                setIsBirthdayPopupVisible(
                  (isBirthdayPopupVisible) => !isBirthdayPopupVisible
                );
                isBirthdayPopupVisible
                  ? unsetFavorite(popupInfoIndex)
                  : setFavorite(popupInfoIndex);
              }}
            ></div>
            <label
              htmlFor="popup-info-item--checkbox"
              className="popup-info-item--checkbox-text"
              onClick={() => {
                setIsBirthdayPopupVisible(
                  (isBirthdayPopupVisible) => !isBirthdayPopupVisible
                );
                isBirthdayPopupVisible
                  ? unsetFavorite(popupInfoIndex)
                  : setFavorite(popupInfoIndex);
              }}
            >
              Mark as important
            </label>
          </div>
        </div>

        <div className="popup-info-item">
          <p className="popup-info-item--title">Note</p>
          <textarea
            className="popup-info-item--note"
            spellCheck="false"
            value={data?.[popupInfoIndex]?.note}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default BirthdayInfoPopup;
