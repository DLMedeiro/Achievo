import React, {useState} from "react";
import Item from "../models/Item";
import Activity from "./Activity";
import ActivityForm from './ActivityForm';
import {v4 as uuidv4} from 'uuid';



interface ItemListProps {
    listItems: Item[]
}

export default function ActivityTracker(): JSX.Element {

    const [listItems, setListItems] = useState<Item[]>([])

    const addItem = (activityName: string,
      timeTarget: number) => {
        const newAdd = new Item(uuidv4(), activityName, timeTarget)
      setListItems([...listItems, newAdd]);
    };
  
    // const removeItem = (id) => {
    //   setListItems(listItems.filter((i) => i.id !== id));
    // };
    
    const removeItem = (id: string):void => {
        setListItems(listItems.filter((i) => i.id !== id));
      };

    return (
        <div>
            <h2>Activities</h2>
            <ActivityForm onAddItem={addItem} />
            <ul>
                {listItems.map((item) => (
                    <Activity key = {item.id} items = {item} onRemoveItem = {removeItem} />
                ))}
            </ul>
        </div>
    )
}