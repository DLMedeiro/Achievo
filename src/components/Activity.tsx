import React from "react";
import Item from "../models/Item";

interface Props {
    items: Item;
    onRemoveItem: (id: string) => void
}

export default function Activity(props: Props): JSX.Element {

    const handleRemove = (id: string): void => {
        props.onRemoveItem(id)
    }

    return (
            <li key ={props.items.id} >
                Activity: {props.items.activityName} | Target Time: {props.items.timeTarget} Hours
                <button>Edit</button>
                <button onClick={() => handleRemove(props.items.id)} >Delete</button>
            </li>
    )
}