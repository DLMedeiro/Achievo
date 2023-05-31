import { useAppDispatch } from '../app/hooks'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }: any) {
  const dispatch = useAppDispatch()
  return (
    <div className="goal">
      {/* {goal.createdAt} */}
      <div>Start: {new Date(goal.start).toLocaleString('en-US')}</div>
      <div>End: {new Date(goal.end).toLocaleString('en-US')}</div>
      <h2>{goal.activity}</h2>
      {/* <button onClick={() => console.log(goal._id)} className="close">
        X
      </button> */}
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        X
      </button>
    </div>
  )
}

export default GoalItem
