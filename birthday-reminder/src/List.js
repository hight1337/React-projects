import React from 'react'
import { MdDeleteForever } from 'react-icons/md'

const List = ({ people, remove }) => {
  return (
    <>
      {people.map((person) => {
        const { id, name, age, image } = person
        return (
          <article className='person' key={id}>
            <img src={image} alt={name} />
            <div>
              <h4>{name}</h4>
              <p>{age} years</p>
            </div>
            <div className='icon'>
              <MdDeleteForever onClick={() => remove(id)} />
            </div>
          </article>
        )
      })}
    </>
  )
}

export default List
