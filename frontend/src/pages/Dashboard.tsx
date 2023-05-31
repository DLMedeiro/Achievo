import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import ActivityItem from '../components/ActivityItem'
import ActivityInputForm from '../components/ActivityInputForm'

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
  // Needed to add to allow for user.name to work -> Doesn't seem right

  const { user }: userState = useAppSelector((state: RootState) => state.auth)
  const { goals, isLoading, isError, message }: goalState = useAppSelector(
    (state: RootState) => state.goals,
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals(user))

    // clear goals when the component unmounts
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

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
        <h1>Welcome {user && user.name}</h1>
      </section>
      <ActivityInputForm />

      {/* goals */}
      <section className="content">
        {goals && goals.length > 0 ? (
          <div className="goals">
            {/* {goals.map((goal) => (
              <ActivityItem key={goal._id} goal={goal} />
            ))} */}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
