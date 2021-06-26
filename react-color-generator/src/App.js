import React, { useState } from 'react'
import SingleColor from './SingleColor'

import Values from 'values.js'

function App() {
  const [color, setColor] = useState('')
  const [error, setError] = useState(false)
  const [list, setList] = useState(new Values('#03fc94').all(10))
  const [numberOfColors, setNumberOfColors] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      const colorNumber = parseInt(numberOfColors)
      let colors = new Values(color).all(colorNumber)
      console.log(colors)
      setList(colors)
      setError(false)
      console.log(colors)
    } catch (error) {
      setError(true)
    }
  }

  return (
    <>
      <section className='container'>
        <h3>Color generator</h3>
        <form className='' onSubmit={handleSubmit}>
          <label htmlFor='hex'>
            <span>Hex:</span>
          </label>
          <input
            type='text'
            name='hex'
            id='hex'
            value={color}
            placeholder='#03fc94'
            onChange={(e) => setColor(e.target.value)}
            onClick={() => setError(false)}
            className={`${error && 'error'}`}
          />
          <button className='btn' type='submit'>
            submit
          </button>
          <input
            type='number'
            id='number'
            value={numberOfColors}
            min='0'
            max='100'
            onChange={(e) => setNumberOfColors(e.target.value)}
            placeholder='1-100'
            className='input-number'
          />
          {error && <span className='error-text'>worng color value</span>}
        </form>
      </section>
      <section className='colors'>
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          )
        })}
      </section>
    </>
  )
}

export default App
