import React, { useState } from 'react'
import Item from '../models/Item'
import Activity from './Activity'
import ActivityInputForm from './ActivityInputForm'
import { v4 as uuidv4 } from 'uuid'
import { Grid } from '@mui/material'

// interface ItemListProps {
//   listItems: Item[]
// }

export default function ActivityTracker(): JSX.Element {
  const [listItems, setListItems] = useState<Item[]>([])

  const addItem = (
    start: string,
    end: string,
    activity: string,
    target: number,
    progress: number,
  ) => {
    const newAdd = new Item(uuidv4(), start, end, activity, target, progress)
    setListItems([...listItems, newAdd])
    storeInLocalStorage(newAdd)
  }

  // Add to local storage
  const storeInLocalStorage = (task: object): void => {
    let savedTasks
    if (localStorage.getItem('savedTasks') === null) {
      savedTasks = []
    } else {
      savedTasks = JSON.parse(localStorage.getItem('savedTasks') || '')
    }
    savedTasks.push(task)
    localStorage.setItem('savedTasks', JSON.stringify(savedTasks))
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: '78px 0',
        height: '90vh',
        display: 'flex',
        // flexDirection: 'column', -> not needed?
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid item xs={5} sx={{ fontSize: '2rem' }}>
        <h2>Create an activity</h2>
      </Grid>
      <Grid item xs={7}>
        <ActivityInputForm onAddItem={addItem} />
      </Grid>
    </Grid>
  )
}
