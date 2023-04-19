// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachItem, updateFav} = props
  const {title, date, isFav, id} = eachItem
  const imgUrl = isFav
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  console.log(isFav)
  const changeFav = () => {
    updateFav(id)
  }

  return (
    <li className="appointment-card">
      <div className="title-star">
        <p className="title">{title}</p>
        <button data-testid="star" onClick={changeFav} type="button">
          <img className="star" src={imgUrl} alt="star" />
        </button>
      </div>
      <p>Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
