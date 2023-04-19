// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', isStarred: false, appointmentsList: []}

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title,
      date: formattedDate,
      isFav: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  updateTitle = event => {
    this.setState({title: event.target.value})
  }

  updateDate = event => {
    this.setState({date: event.target.value})
  }

  updateFav = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          console.log(eachItem)
          return {...eachItem, isFav: !eachItem.isFav}
        }
        return eachItem
      }),
    }))
  }

  updateStarStatus = () => {
    this.setState(prevState => ({isStarred: !prevState.isStarred}))
  }

  render() {
    const {title, date, appointmentsList, isStarred} = this.state
    let updatedList
    if (isStarred) {
      updatedList = appointmentsList.filter(eachItem => eachItem.isFav === true)
    } else {
      updatedList = appointmentsList
    }
    const starBtnStyle = isStarred ? 'active' : 'inactive'

    return (
      <div className="bg">
        <div className="card">
          <div className="top-section">
            <form className="form-data" onSubmit={this.addAppointment}>
              <h1>Add Appointment</h1>
              <label className="label-text" htmlFor="title">
                TITLE
              </label>
              <input
                value={title}
                onChange={this.updateTitle}
                className="user-input"
                placeholder="Title"
                type="text"
                id="title"
              />
              <label className="label-text" htmlFor="date">
                DATE
              </label>
              <input
                value={date}
                onChange={this.updateDate}
                className="user-input"
                type="date"
                id="date"
              />
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-img"
            />
          </div>
          <hr className="line" />
          <div className="app-star">
            <h1 className="heading">Appointments</h1>
            <button
              onClick={this.updateStarStatus}
              className={starBtnStyle}
              type="button"
            >
              starred
            </button>
          </div>
          <ul className="appointments">
            {updatedList.map(eachItem => (
              <AppointmentItem
                updateFav={this.updateFav}
                key={eachItem.id}
                eachItem={eachItem}
                isStarred={isStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
