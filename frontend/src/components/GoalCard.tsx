import React, { useState, useEffect } from 'react'
import Item from '../models/Item'
import { Grid } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import Paper from '@mui/material/Paper'
import '../styles/App.css'
import Button from '@mui/material/Button'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  getOneGoal,
  deleteGoal,
  updateProgress,
} from '../features/goals/goalSlice'
// import AddSubtract from './AddSubtract' -> Bring back after removing local state dependency
import { useNavigate } from 'react-router-dom'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline'
import { RootState } from '../app/store'

interface userState {
  user: any
}
interface Props {
  items: Item
  onRemoveItem: (id: string) => void
}
// Refactor

export default function Activity({ goal }: any) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  let singleGoal

  const { user }: userState = useAppSelector((state: RootState) => state.auth)
  // interface Goal {
  //   _id: string
  //   user: string
  //   name: string
  //   start: Date
  //   end: Date
  //   timeAllotment: Number
  //   progress: Number
  //   createdAt: string
  //   updatedAt: string
  //   __v?: number
  // }
  // interface goalState {
  //   goals: Goal[] | null
  //   isError: boolean
  //   isSuccess: boolean
  //   isLoading: boolean
  //   message: string | undefined
  // }

  // const { goals, isLoading, isError, message }: goalState = useAppSelector(
  //   (state: RootState) => state.goals,
  // )

  const [edit, setEdit] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [boxShadow, setBoxShadow] = useState(
    '0px 7px 9px -4px rgb(0 0 0 / 20%), 0px 14px 21px 2px rgb(0 0 0 / 14%), 0px 5px 26px 4px rgb(0 0 0 / 12%)',
  )
  // const [activity, setActivity] = useState(props.items.activity)
  // const [timeTarget, setTimeTarget] = useState(props.items.target)
  const [progress, setProgress] = useState(goal.progress)
  // const [start, setStart] = useState(props.items.start)
  // const [end, setEnd] = useState(props.items.end)
  const [duration, setDuration] = React.useState<number>()
  const [percentComplete, setPercentComplete] = React.useState<number>(
    Math.round((goal.progress / goal.target) * 100),
  )

  // const handleRemove = (id: string): void => {
  //   props.onRemoveItem(id)
  // }

  const setEditFunction = (): void => {
    if (edit === true) {
      setEdit(false)
    } else {
      setEdit(true)
    }
  }

  useEffect(() => {
    // singleGoal = dispatch(getOneGoal(goal._id))
    let today = dayjs().format('LL')

    let hours = dayjs(goal.end).diff(today, 'hours')
    const days = Math.floor(hours / 24)
    setDuration(days)
  }, [])

  useEffect(() => {
    {
      progress === 0 && progress < goal.target
        ? setPercentComplete(0)
        : setPercentComplete(Math.round((progress / goal.target) * 100))
      // Rounding not exact but works for current need
    }
  }, [progress, goal.target])

  // Edit local storage
  // const editLocalStorage = (id: string, action: string): void => {
  //   let savedTasks = JSON.parse(localStorage.getItem('savedTasks') || '')
  //   for (let i = 0; i < savedTasks.length; i++) {
  //     if (savedTasks[i].id == id) {
  //       // retrieve the task and convert to JS
  //       // modify the object, convert it to a string and replace the existing item
  //       if (action == 'add') {
  //         savedTasks[i].progress += 1
  //       } else {
  //         savedTasks[i].progress -= 1
  //       }
  //     }
  //     localStorage.setItem('savedTasks', JSON.stringify(savedTasks))
  //   }
  // }

  useEffect(() => {
    if (progress >= goal.target) {
      setCompleted(true)
    } else {
      setCompleted(false)
    }
  }, [progress])

  const addProgress = () => {
    // updating the database
    dispatch(updateProgress({ id: goal._id, change: 'add', user: user._id }))

    // Update the UI

    if (progress + 1 <= goal.target) {
      setProgress(progress + 1)
    }
    // if (goal.progress + 1 == goal.target) {
    //   setCompleted(true)
    // }
  }

  const subtractProgress = () => {
    dispatch(
      updateProgress({ id: goal._id, change: 'subtract', user: user._id }),
    )
    if (progress > 0) {
      setProgress(progress - 1)
    }
    // if (progress - 1 < goal.target) {
    //   setCompleted(false)
    // }
  }
  const editActivity = () => {
    localStorage.setItem('goal', JSON.stringify(goal))
    navigate('/GoalEditForm')
  }
  const deleteItem = () => {
    dispatch(deleteGoal(goal._id))
    // window.location.reload()
    // Refactor / solve issue of component no reloading when item is deleted or addedd
  }

  useEffect(() => {
    if (completed) {
      setBoxShadow(
        '0px 7px 9px -4px rgb(3 164 3 / 20%), 0px 14px 21px 2px rgb(3 164 3 / 14%), 0px 5px 26px 4px rgb(3 164 3 / 12%)',
      )
    } else {
      setBoxShadow(
        '0px 7px 9px -4px rgb(0 0 0 / 20%), 0px 14px 21px 2px rgb(0 0 0 / 14%), 0px 5px 26px 4px rgb(0 0 0 / 12%)',
      )
    }
  }, [completed])

  return (
    <Paper
      elevation={14}
      sx={{
        padding: ' 2em',
        borderRadius: '30px',
        margin: '1rem',
        boxShadow: { boxShadow },
        backgroundColor: 'transparent,',
      }}
      key={goal.id}
    >
      <Grid
        container
        spacing={0}
        sx={{
          // padding: '78px 0',
          // height: '90vh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid
          item
          xs={11}
          sx={{
            fontSize: '2rem',
            borderBottom: '2px solid black',
            marginBottom: '5px',
            '&:hover': {
              color: '#cb99d5',
              borderBottom: '2px solid #cb99d5',
              cursor: 'pointer',
            },
          }}
          onClick={editActivity}
        >
          {completed ? (
            <>
              {goal.activity} <DoneOutlineIcon style={{ color: 'green' }} />
            </>
          ) : (
            <>{goal.activity}</>
          )}
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            fontSize: '2rem',
            justifyContent: 'flex-start',
          }}
        >
          <DeleteForeverIcon
            sx={{
              fontSize: '2rem',
              marginBottom: '5%',
              marginLeft: 'auto',
              width: '100%',
            }}
            onClick={deleteItem}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} sx={{ fontSize: '1rem' }}>
          <div>
            {duration} {duration == 1 ? 'Day Remaining' : 'Days Remaining'}
          </div>
        </Grid>
        <Grid item xs={12} sx={{ fontSize: '1rem' }}>
          <div>
            Start:{' '}
            {new Date(goal.start).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}{' '}
            | End:{' '}
            {new Date(goal.end).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        sx={{
          // padding: '78px 0',
          // height: '90vh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid item xs={3} sx={{ fontSize: '2rem' }}>
          <Button
            onClick={addProgress}
            variant="contained"
            color="secondary"
            sx={{
              my: 2,
              borderRadius: '40px',
              width: '100%',
              minWidth: '10px',
              marginRight: '5px',
              maxWidth: '35px',
            }}
          >
            <AddIcon />
          </Button>
          <Button
            onClick={subtractProgress}
            variant="contained"
            color="secondary"
            sx={{
              my: 2,
              borderRadius: '40px',
              width: '100%',
              minWidth: '10px',
              maxWidth: '35px',
            }}
          >
            <RemoveIcon />
          </Button>
        </Grid>

        <Grid item xs={8} sx={{ fontSize: '1rem' }}>
          <div className="progress">
            <div
              className="progress-done"
              style={{ width: `${percentComplete}%` }}
            >
              {percentComplete == 0 ? (
                <p style={{ marginLeft: '50px' }}>{percentComplete}%</p>
              ) : (
                <p>{percentComplete}%</p>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {completed ? (
          <Grid
            item
            xs={12}
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              padding: '5px',
              borderBottom: '2px solid green',
            }}
          >
            {progress} of {goal.target} hour target completed!
          </Grid>
        ) : (
          <Grid
            item
            xs={12}
            sx={{
              fontSize: '1rem',
            }}
          >
            {progress} of {goal.target} hour target completed
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}
