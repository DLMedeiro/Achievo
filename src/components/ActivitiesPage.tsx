import React, { useEffect, useState } from 'react'
import Item from '../models/Item'
import Activity from './Activity'
import ActivityInputForm from './ActivityInputForm'
import { v4 as uuidv4 } from 'uuid'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import InspirationQuote from './InspirationQuote'

export default function ActivitiesPage(): JSX.Element {
  const [listItems, setListItems] = useState<Item[]>([])
  const [showForm, setShowForm] = React.useState<boolean>(false)
  const [quote, setQuote] = React.useState([])
  // Load local storage when document is loaded
  useEffect(() => {
    setListItems(JSON.parse(localStorage.getItem('savedTasks') || ''))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://type.fit/api/quotes')
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          setQuote(Object.values(data[Math.floor(Math.random() * data.length)]))
        })
    }
    fetchData().catch(console.error)
  }, [])

  const removeItem = (id: string): void => {
    setListItems(listItems.filter((i) => i.id !== id))
    removeFromLocalStorage(id)
  }

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
    setShowForm(false)
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
    <Grid
      container
      spacing={2}
      sx={{
        padding: '78px 0',
        height: '90vh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {quote.length > 0 ? (
        <Grid
          container
          spacing={2}
          sx={{
            padding: '78px 0',
            height: '90vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <InspirationQuote text={quote[0]} author={quote[1]} />

          {showForm ? (
            <ActivityInputForm onAddItem={addItem} />
          ) : (
            <Grid item xs={12} sx={{ fontSize: '2rem' }}>
              <Button
                onClick={() => {
                  setShowForm(true)
                }}
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: '40px',
                  margin: '0 auto',
                }}
              >
                Add a new activity
              </Button>
            </Grid>
          )}

          <Grid item xs={12}>
            <ul>
              {listItems.map((item) => (
                <Activity
                  key={item.id}
                  items={item}
                  onRemoveItem={removeItem}
                />
              ))}
            </ul>
          </Grid>
        </Grid>
      ) : (
        <h1>...Loading</h1>
      )}
    </Grid>
  )
}
