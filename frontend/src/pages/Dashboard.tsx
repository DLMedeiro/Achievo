import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import ActivityCard from '../components/ActivityCard'
import ActivityInputForm from '../components/forms/ActivityInputForm'
import EngineeringIcon from '@mui/icons-material/Engineering'
import '../styles/Utilities.css'
import FinnModal from '../components/FinnModal'

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
  // useEffect(() => {
  //   window.location.reload()
  // }, [navigate])

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals(user))

    // clear goals when the component unmounts
    // return () => {
    //   dispatch(reset())
    // }
  }, [])
  // useEffect(() => {
  //   if (isError) {
  //     console.log(message)
  //   }
  //   if (!user) {
  //     navigate('/login')
  //   }

  //   dispatch(getGoals(user))

  //   // clear goals when the component unmounts
  //   return () => {
  //     dispatch(reset())
  //   }
  // }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  // if (goals && goals[0]) {
  //   console.log(goals)
  //   console.log(goals[0])
  //   console.log(goals[0].text)
  // }

  return (
    <>
      <section className="heading">
        <h1>Hi {user && user.name}</h1>
      </section>
      <ActivityInputForm />
      {/* goals */}
      <section className="content">
        {goals && goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <ActivityCard key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
