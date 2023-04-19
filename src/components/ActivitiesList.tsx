import React, { useEffect, useState } from 'react'
import Item from '../models/Item'
import Activity from './Activity'
import ActivityInputForm from './ActivityInputForm'
import { v4 as uuidv4 } from 'uuid'
import { Grid } from '@mui/material'

export default function ActivitiesList(): JSX.Element {
  const [listItems, setListItems] = useState<Item[]>([])

  // Load local storage when document is loaded
  useEffect(() => {
    setListItems(JSON.parse(localStorage.getItem('savedTasks') || ''))
  }, [])

  const removeItem = (id: string): void => {
    setListItems(listItems.filter((i) => i.id !== id))
    removeFromLocalStorage(id)
  }

  // Remove from local storage
  function removeFromLocalStorage(id: string): void {
    let savedTasks = JSON.parse(localStorage.getItem('savedTasks') || '')
    for (let i = 0; i < savedTasks.length; i++) {
      if (savedTasks[i].id == id) {
        savedTasks.splice(i, 1)
      }
      localStorage.setItem('savedTasks', JSON.stringify(savedTasks))
    }
  }
  return (
    <ul>
      {listItems.map((item) => (
        <Activity key={item.id} items={item} onRemoveItem={removeItem} />
      ))}
    </ul>
  )
}
