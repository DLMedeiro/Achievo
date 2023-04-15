import React, {useState, useEffect} from "react";
import Item from "../models/Item";
import AddSubtractForm from "./AddSubtract";
import ActivityEditForm from "./ActivityEditForm";

interface Props {
    items: Item;
    onRemoveItem: (id: string) => void
}
// Refactor

export default function Activity(props: Props): JSX.Element {

    const [edit, setEdit] = useState(false)
    const [activity, setActivity] = useState(props.items.activityName)
    const [timeTarget, setTimeTarget] = useState(props.items.timeTarget)



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

    
// Refactor



    return (
            <li key ={props.items.id} >
                Activity: {activity} | Target Time: {timeTarget} Hours
                <button onClick = {setEditFunction}>Edit</button>
                <button onClick={() => handleRemove(props.items.id)} >Delete</button>
                <div>
                    {edit ? (<ActivityEditForm item = {props.items} updateActivity = {setActivity} updateTime = {setTimeTarget} toggle={setEditFunction}/>) : null}
                    {/* {edit ? (<ActivityEditForm activity = {props.items.getActivity} time = {props.items.getTimeTarget} editActivity = {props.items.editActivity} editTime = {props.items.editTimeTarget}/>) : null} */}
                    {/* refactor */}
                </div>
                <AddSubtractForm/>
            </li>
    )
}