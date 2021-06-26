import React, { useState, useEffect } from 'react'

const SingleColor = ({ rgb, weight, index, hexColor, type }) => {
  const [alert, setAlert] = useState(false)

  const bcg = rgb.join(',')
  const hex = `#${hexColor}`

  const copyColor = () => {
    setAlert(true)
    navigator.clipboard.writeText(hex)
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [alert])
  return (
    <article
      onClick={copyColor}
      className={`color ${type === 'shade' && 'color-light'}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
    >
      <p className='percent-value'>{weight}%</p>
      <p className='color-value'>{hex}</p>
      {alert && <p className='alert'>copied to clipboard</p>}
    </article>
  )
}

export default SingleColor
