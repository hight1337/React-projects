import React, { useState } from 'react'
import data from './data'
import List from './List'

function App() {
  const [people, setPeople] = useState(data)

  const handleRemovePerson = (id) => {
    setPeople(people.filter((person) => person.id !== id))
  }
  return (
    <main>
      <section className='container'>
        <h3>{people.length} birthdays today</h3>
        <List people={people} remove={handleRemovePerson} />
        <button onClick={() => setPeople([])}>Clear All</button>
      </section>
    </main>
  )
}

export default App
