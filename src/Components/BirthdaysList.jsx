import './BirthdaysList.css';
import menuIcon from '../Assets/menu.svg';
import editIcon from '../Assets/edit.svg';
import detailsIcon from '../Assets/details.svg';
import { data } from '../test_data'

const BirthdaysList = () => {
  return (
    <section className="birthdays-list">
      <div className="birthdays-list-header">
        <p className="birthdays-list-header--title">Birthdays list</p>
        <div className="birthdays-list-header--controls">
          <img src={menuIcon} className="birthdays-list-header--image" alt='Menu icon' />
          <img src={editIcon} className="birthdays-list-header--image" alt='Edit icon' />
        </div>
      </div>
      <div className="birthdays-list-content">
          {data.map((item, index) => {
            return (
              <div key={index} className="birthdays-list-content--item">
                  <div className="birthdays-list-content--left">
                    <div className="birthdays-list-content--person">
                      <h4 className="birthdays-list-content--name">{item?.['name']} {item?.['surname']}</h4>
                      <h5 className="birthdays-list-content--date">{item?.['date']}</h5>
                    </div>
                    <div className="birthdays-list-content--icon">
                      <img className="birthdays-list-content--image" src={detailsIcon} alt="Details icon" />
                    </div>
                  </div>
                  <div className="birthdays-list-content--right">
                    <p className="birthdays-list-content--days light">6 days</p>
                  </div>
              </div>
            )
          })}
      </div>
    </section>
  )
}

export default BirthdaysList