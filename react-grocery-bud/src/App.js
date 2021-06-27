import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('taskList')
  if (list) {
    return JSON.parse(localStorage.getItem('taskList'))
  } else {
    return []
  }
}

function App() {
  const [inputText, setInputText] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [tasksList, setTasksList] = useState(getLocalStorage())
  const [editID, setEditId] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputText) {
      showAlert(true, 'danger', 'please enter value')
    } else if (inputText && isEditing) {
      setTasksList(
        tasksList.map((item) => {
          if (item.id === editID) {
            return { ...item, title: inputText }
          }
          return item
        })
      )
      setInputText('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true, 'success', 'value changed')
    } else {
      showAlert(true, 'success', 'item added to the list')
      const newItem = { id: Math.random(), title: inputText }
      setTasksList([...tasksList, newItem])
      setInputText('')
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, 'danger', 'list cleared')
    setTasksList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    setTasksList(tasksList.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = tasksList.find((item) => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setInputText(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(tasksList))
  }, [tasksList])
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && (
          <Alert {...alert} removeAlert={showAlert} list={tasksList} />
        )}
        <h3>Grocery Bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='Enter text here'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {tasksList.length > 0 && (
        <div className='grocery-container'>
          <List items={tasksList} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            clear all
          </button>
        </div>
      )}
    </section>
  )
}

export default App
