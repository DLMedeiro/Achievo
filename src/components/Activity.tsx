import React, {useState, useEffect} from "react";
import Item from "../models/Item";
import AddSubtract from "./AddSubtract";
import ActivityEditForm from "./ActivityEditForm";

interface Props {
    items: Item;
    onRemoveItem: (id: string) => void
}
// Refactor

export default function Activity(props: Props): JSX.Element {

    const [edit, setEdit] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [activity, setActivity] = useState(props.items.activityName)
    const [timeTarget, setTimeTarget] = useState(props.items.timeTarget)
    const [progress, setProgress] = useState(props.items.getProgress())



    const handleRemove = (id: string): void => {
        props.onRemoveItem(id)
    }

    const setEditFunction = (): void => {
        if (edit === true){
            setEdit(false)
        } else {
            setEdit(true)
        }
    }

    const add = () => {
        props.items.addProgress()
        setProgress(props.items.getProgress())
      }
    
      const subtract= () => {
        if (progress > 0){
            props.items.removeProgress()
            setProgress(props.items.getProgress())
        }
        // Add alert when time can no longer be removed
      }

      useEffect(() => {
        if (progress >= timeTarget){
            setCompleted(true)
        }
      }, [progress])



    return (
            <li key ={props.items.id} >
                Activity: {activity} | Target Time: {timeTarget} Hours

                <button onClick = {setEditFunction}>Edit</button>

                <button onClick={() => handleRemove(props.items.id)} >Delete</button>
      
                {edit ? (<ActivityEditForm item = {props.items} updateActivity = {setActivity} updateTime = {setTimeTarget} toggle={setEditFunction}/>) : null}

                <div>
                {completed ? 
                    (<h4>Goal Achieved!</h4>) 
                    : ( <>
                        <button onClick={add} >ADD 1 Hour</button>
                        <button onClick={subtract}>SUBTRACT 1 Hour</button>
                        <h4>Time Completed: {progress > 1 ? `${progress} Hours` : `${progress} Hour`} 
                            </h4>
                        <h4>Progress: {progress === 0 ? ("0") : ((progress / timeTarget) * 100)}%
                            </h4>
                        </>
                    )
                }
               

                </div>

            </li>
    )
}