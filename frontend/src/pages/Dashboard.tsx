import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import CircularIndeterminate from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import GoalCard from '../components/GoalCard'
import GoalInputForm from '../components/forms/GoalInputForm'
import EngineeringIcon from '@mui/icons-material/Engineering'
// import '../styles/Utilities.css'
import FinnModal from '../components/FinnModal'
import { Grid, Paper } from '@mui/material'
import { TransitionGroup } from 'react-transition-group'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  interface userState {
    user: any
  }
  interface Goal {
    _id: string
    user: string
    name: string
    start: Date
    end: Date
    timeAllotment: Number
    progress: Number
    createdAt: string
    updatedAt: string
    __v?: number
  }
  interface goalState {
    goals: Goal[] | null
    isError: boolean
    isSuccess: boolean
    isLoading: boolean
    message: string | undefined
  }

  const { user }: userState = useAppSelector((state: RootState) => state.auth)
  const { goals, isLoading, isError, message }: goalState = useAppSelector(
    (state: RootState) => state.goals,
  )

  // Figure out how to have the new change populate after completing the edit

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals(user))
    console.log(goals)

    // clear goals when the component unmounts
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <CircularIndeterminate />
  }

  return (
    <>
      <section>
        <h1>Welcome Back {user && user.name}!</h1>
      </section>

      <GoalInputForm />

      {/* goals */}

      {goals && goals.length > 0 ? (
        <>
          <TransitionGroup />
          {goals.map((goal) => (
            <GoalCard key={goal._id} goal={goal} />
          ))}
        </>
      ) : (
        <>
          <h3>You have not set any goals</h3>
        </>
      )}
    </>
  )
}

export default Dashboard
