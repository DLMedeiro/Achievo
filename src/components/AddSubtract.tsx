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

export default function AddSubtract(): JSX.Element{
    // const [formData, setFormData] = useState({
    //   activityName: "",
    //   timeTarget: 1
    // });
  const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data)
    // onAddItem(data.activityName, data.timeTarget)
    // setFormData({
    //     activityName: "",
    //     timeTarget: 1
    //   })
  }

  return (
    <>
        <button>ADD</button>
        <button>SUBTRACT</button>
    
    </>
  );
}