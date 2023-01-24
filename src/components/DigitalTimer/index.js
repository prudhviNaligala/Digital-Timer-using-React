// Write your code here

import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {minutes: 25, seconds: 0, timer: false}

  onIncrement = () => {
    this.setState(prevState => {
      const {minutes} = prevState
      return {
        minutes: minutes + 1,
      }
    })
  }

  onReset = () => {
    clearInterval(this.intervalId)
    this.setState({minutes: 25, seconds: 0, timer: false})
  }

  onDecrement = () => {
    const {minutes} = this.state
    if (minutes > 1) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
      }))
    }
  }

  minutesAndSeconds = () => {
    const {minutes, seconds} = this.state
    const remainingSeconds = minutes * 60 - seconds
    const strMinutes = Math.floor(remainingSeconds / 60)
    const strSeconds = Math.floor(remainingSeconds % 60)
    const stringifiedMinutes = strMinutes > 9 ? strMinutes : `0${strMinutes}`
    const stringifiedSeconds = strSeconds > 9 ? strSeconds : `0${strSeconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  incrementSeconds = () => {
    const {minutes, seconds} = this.state
    const isTimerCompleted = seconds === minutes * 60
    if (isTimerCompleted) {
      this.clearInterval(this.intervalId)
      this.setState({timer: false})
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {minutes, seconds, timer} = this.state
    const isTimerCompleted = seconds === minutes * 60

    if (isTimerCompleted) {
      this.setState({seconds: 0})
    }
    if (timer) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.incrementSeconds, 1000)
    }
    this.setState(prevState => ({timer: !prevState.timer}))
  }

  render() {
    const {timer, minutes, seconds} = this.state
    const imgUrl = timer
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '
    const altMsg = timer ? 'pause icon' : 'play icon'
    const isButtonsDisabled = seconds > 0

    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="display-time-pause-play">
          <div className="display-timer-container">
            <div className="display-timer">
              <h1>{this.minutesAndSeconds()}</h1>
              <p>{timer ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="pause-play-container">
            <div className="pause-play-img">
              <button type="button" className="btn">
                <img
                  className="image"
                  src={imgUrl}
                  alt={altMsg}
                  onClick={this.onStartOrPauseTimer}
                />
                <p className="para">{timer ? 'Pause' : 'Start'}</p>
              </button>
              <button type="button" className="btn" onClick={this.onReset}>
                <img
                  className="image"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                  alt="reset icon"
                />
                <p className="para">Reset</p>
              </button>
            </div>
            <p>Set Timer Limit</p>
            <div className="inc-dec">
              <button
                className="btn1"
                type="button"
                onClick={this.onDecrement}
                disabled={isButtonsDisabled}
              >
                -
              </button>
              <p className="para1">{minutes}</p>
              <button
                className="btn1"
                type="button"
                onClick={this.onIncrement}
                disabled={isButtonsDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
