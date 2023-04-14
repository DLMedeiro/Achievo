import React from "react";
import Item from "../models/Item";



interface ItemListProps {
    listItems: Item[]
}

export default function timeTracker(props: ItemListProps): JSX.Element {



    return (
        <div>
            <h2>Activities</h2>
            <ul>

                {props.listItems.map((item) => (
                    <li >Activity: {item.activityName} | Target Time: {item.timeTarget} Hours</li>
                ))}
            </ul>
        </div>
    )
}