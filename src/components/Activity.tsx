import React, { useState, useEffect } from 'react'
import Item from '../models/Item'
import { Grid } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import Paper from '@mui/material/Paper'
import '../App.css'
// import AddSubtract from './AddSubtract' -> Bring back after removing local state dependency

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
  const [start, setStart] = useState(props.items.start)
  const [end, setEnd] = useState(props.items.end)
  const [duration, setDuration] = React.useState<number>()

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

  useEffect(() => {
    let today = dayjs().format('LL')
    let hours = dayjs(end).diff(today, 'hours')
    const days = Math.floor(hours / 24)
    setDuration(days)
  }, [])

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
    <Paper
      elevation={14}
      sx={{ padding: ' 2em', borderRadius: '30px', margin: '1rem' }}
      key={props.items.id}
    >
      <Grid
        container
        spacing={2}
        sx={{
          // padding: '78px 0',
          // height: '90vh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid item xs={12} sx={{ fontSize: '2rem' }}>
          {activity} | Target: {timeTarget} Hours
        </Grid>
        <Grid item xs={12} sx={{ fontSize: '2rem' }}>
          Days Remaining: {duration}
        </Grid>

        {/* {edit ? (
        <ActivityEditForm
          item={props.items}
          updateActivity={setActivity}
          updateTime={setTimeTarget}
          toggle={setEditFunction}
        />
      ) : null} */}
        <Grid item xs={12} sx={{ fontSize: '2rem' }}>
          {completed ? <h4>Goal Achieved!</h4> : ''}{' '}
        </Grid>
        <Grid item xs={12} sx={{ fontSize: '2rem' }}>
          <button onClick={() => add(props.items.id)}>ADD 1 Hour</button>
          <button onClick={() => subtract(props.items.id)}>
            SUBTRACT 1 Hour
          </button>
        </Grid>
        <Grid item xs={12} sx={{ fontSize: '2rem' }}>
          <h4>
            Time Completed:{' '}
            {progress > 1 ? `${progress} Hours` : `${progress} Hour`}
          </h4>
          <div
            className="progress"
            data-done={progress === 0 ? '0' : (progress / timeTarget) * 100}
          >
            {progress === 0 ? '0' : (progress / timeTarget) * 100}%
          </div>
          <h4>
            Progress: {progress === 0 ? '0' : (progress / timeTarget) * 100}%
          </h4>
        </Grid>
        <Grid item xs={12} sx={{ fontSize: '2rem' }}>
          <button onClick={setEditFunction}>Edit - inactive</button>
          <button onClick={() => handleRemove(props.items.id)}>Delete</button>
        </Grid>
      </Grid>
    </Paper>
  )
}
