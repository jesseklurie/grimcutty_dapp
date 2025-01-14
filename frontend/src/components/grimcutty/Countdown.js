'use client'

import React, { useEffect, useState } from 'react'

import './Countdown.css'

// Import the CSS file for styling

const Countdown = () => {
  const [timeRemaining, setTimeRemaining] = useState({})
  const releaseDate = new Date('2024-10-31T00:00:00') // Set your release date here

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const difference = releaseDate - now

      if (difference <= 0) {
        clearInterval(interval)
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeRemaining({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [releaseDate])

  return (
    <div className="countdown">
      <h2 className="countdown-title">The Grimcutty Coin Awakens In:</h2>
      <div className="countdown-timer">
        <div className="countdown-item">
          <span className="countdown-number">{timeRemaining.days || '00'}</span>
          <span className="countdown-label">Days</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-number">{timeRemaining.hours || '00'}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-number">{timeRemaining.minutes || '00'}</span>
          <span className="countdown-label">Minutes</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-number">{timeRemaining.seconds || '00'}</span>
          <span className="countdown-label">Seconds</span>
        </div>
      </div>
    </div>
  )
}

export default Countdown
