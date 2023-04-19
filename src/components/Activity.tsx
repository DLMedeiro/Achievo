import React, { useState, useEffect } from 'react'
import Item from '../models/Item'
import AddSubtract from './AddSubtract'
import ActivityEditForm from './ActivityEditForm'

interface Props {
  items: Item
  onRemoveItem: (id: string) => void
}
// Refactor

export default function Activity(props: Props): JSX.Element {
  const [edit, setEdit] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [activity, setActivity] = useState(props.items.activity)
  const [timeTarget, setTimeTarget] = useState(props.items.target)
  const [progress, setProgress] = useState(props.items.progress)

  const handleRemove = (id: string): void => {
    props.onRemoveItem(id)
  }

  const setEditFunction = (): void => {
    if (edit === true) {
      setEdit(false)
    } else {
      setEdit(true)
    }
  }

  // Edit local storage
  const editLocalStorage = (id: string, action: string): void => {
    let savedTasks = JSON.parse(localStorage.getItem('savedTasks') || '')
    for (let i = 0; i < savedTasks.length; i++) {
      if (savedTasks[i].id == id) {
        // retrieve the task and convert to JS
        // modify the object, convert it to a string and replace the existing item
        if (action == 'add') {
          savedTasks[i].progress += 1
        } else {
          savedTasks[i].progress -= 1
        }
      }
      localStorage.setItem('savedTasks', JSON.stringify(savedTasks))
    }
  }

  const add = (id: string) => {
    editLocalStorage(id, 'add')
    setProgress(progress + 1)
  }

  const subtract = (id: string) => {
    if (progress > 0) {
      editLocalStorage(id, 'subtract')
      setProgress(progress - 1)
    }
    // Add alert when time can no longer be removed
  }

  useEffect(() => {
    if (progress >= timeTarget) {
      setCompleted(true)
    } else {
      setCompleted(false)
    }
  }, [progress])

  return (
    <li key={props.items.id}>
      Activity: {activity} | Target Time: {timeTarget} Hours
      <button onClick={setEditFunction}>Edit</button>
      <button onClick={() => handleRemove(props.items.id)}>Delete</button>
      {edit ? (
        <ActivityEditForm
          item={props.items}
          updateActivity={setActivity}
          updateTime={setTimeTarget}
          toggle={setEditFunction}
        />
      ) : null}
      <div>
        {completed ? <h4>Goal Achieved!</h4> : ''}{' '}
        <>
          <button onClick={() => add(props.items.id)}>ADD 1 Hour</button>
          <button onClick={() => subtract(props.items.id)}>
            SUBTRACT 1 Hour
          </button>
          <h4>
            Time Completed:{' '}
            {progress > 1 ? `${progress} Hours` : `${progress} Hour`}
          </h4>
          <h4>
            Progress: {progress === 0 ? '0' : (progress / timeTarget) * 100}%
          </h4>
        </>
      </div>
    </li>
  )
}
