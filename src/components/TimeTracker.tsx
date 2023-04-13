import React from "react";
import Item from "../models/Item";



interface ItemListProps {
    listItems: Item[]
}

export default function timeTracker(props: ItemListProps): JSX.Element {



    return (
        <div>
            <h1>Activity Tracker</h1>
            <ul>
                {props.listItems.map((item) => (
                    <li key = {item.id}>{item.activity} - {item.target}</li>
                ))}
            </ul>
        </div>
    )
}