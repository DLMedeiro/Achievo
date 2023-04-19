import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import Item from '../models/Item'
import ActivityTracker from './ActivityTracker'

// interface ListFormProps {
//     onEditItem: (id: string, activityName: string,
//         timeTarget: number) => void;
//   }

interface DefaultProps {
  item: Item
  updateActivity: React.Dispatch<React.SetStateAction<string>>
  updateTime: React.Dispatch<React.SetStateAction<number>>
  toggle: () => void
}
// interface DefaultProps { activity: string; time: number; editActivity:(newName:string)=>string; editTime:(newTime:number)=>number };

interface IFormInput {
  activity: string
  target: number
}

export default function ActivityEditForm(props: DefaultProps): JSX.Element {
  // const [formData, setFormData] = useState({
  //   activityName: "",
  //   timeTarget: 1
  // });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // onAddItem(data.activityName, data.timeTarget)
    // setFormData({
    //     activityName: "",
    //     timeTarget: 1
    //   })
    props.item.editActivity(data.activity)
    props.item.editTimeTarget(data.target)
    props.updateActivity(props.item.getActivity())
    props.updateTime(props.item.getTimeTarget())
    props.toggle()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Activity Name</label>
      <input
        defaultValue={props.item.activity}
        {...register('activity', { required: true, minLength: 4 })}
      />
      {errors.activity && 'Activity Name is required'}
      <label>Target Time</label>
      <input
        type="number"
        defaultValue={props.item.target}
        {...register('target', { required: true, min: 1 })}
      />
      {errors.target && 'Target Time is required'}
      <input type="submit" />
    </form>
  )
}
