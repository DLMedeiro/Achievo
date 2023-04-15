import React , {useState} from "react";
import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";

interface ListFormProps {
    onAddItem: (activityName: string,
        timeTarget: number) => void;
  }

interface IFormInput {
  activityName: string;
  timeTarget: number;
}

export default function ActivityForm({ onAddItem }: ListFormProps): JSX.Element{
    const [formData, setFormData] = useState({
      activityName: "",
      timeTarget: 1
    });
  const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => {
    onAddItem(data.activityName, data.timeTarget)
    setFormData({
        activityName: "",
        timeTarget: 1
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Activity Name</label>
      <input {...register("activityName", { required: true, minLength: 4 })} />
      {errors.activityName && "Activity Name is required"}
      <label>Target Time</label>
      <input type="number" {...register("timeTarget", { required: true, min: 1 })} />
      {errors.timeTarget && "Target Time is required"}
      <input type="submit" />
    </form>
  );
}