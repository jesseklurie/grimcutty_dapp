// src/FloatingSVGs.js
import React, { useEffect, useState } from 'react'

import './FloatingSVGs.css'

// We'll create this CSS file next

const FloatingSVGs = () => {
  const [objects, setObjects] = useState([])

  useEffect(() => {
    const createFloatingObjects = () => {
      const newObjects = Array.from({ length: 10 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDuration: `${Math.random() * 5 + 3}s`,
      }))
      setObjects(newObjects)
    }

    createFloatingObjects()
    const interval = setInterval(createFloatingObjects, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="floating-container">
      {objects.map((style, index) => (
        <svg
          key={index}
          width="50"
          height="50"
          viewBox="0 0 24 24"
          className="floating-object"
          style={{
            position: 'absolute',
            left: `${style.left}%`,
            top: `${style.top}%`,
            animationDuration: style.animationDuration,
          }}
        >
          <path d="M10 2L8 10L2 12L6 14L4 20L10 18L16 20L14 14L22 10L12 4L10 2Z" fill="gold" />
        </svg>
      ))}
    </div>
  )
}

export default FloatingSVGs
