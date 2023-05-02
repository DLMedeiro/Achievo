import React, { useEffect, useState } from 'react'
import Item from '../models/Item'
import Activity from './Activity'
import ActivityInputForm from './ActivityInputForm'
import { v4 as uuidv4 } from 'uuid'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export default function NewsPage(): JSX.Element {
  const [listItems, setListItems] = useState<string>('')
  //   const [listItems, setListItems] = useState<Item[]>([])
  //   const [showForm, setShowForm] = React.useState<boolean>(false)
  //   const [quote, setQuote] = React.useState([])
  //   // Load local storage when document is loaded
  //   useEffect(() => {
  //     setListItems(JSON.parse(localStorage.getItem('savedTasks') || ''))
  //   }, [])

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        'https://newsapi.org/v2/top-headlines?country=us&totalResults=2&apiKey=2aaaf7f18af74331bd145d52455e0f9c',
      )
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          // setQuote(Object.values(data[Math.floor(Math.random() * data.length)]))
          setListItems(data.articles[0].urlToImage)
        })
    }
    fetchData().catch(console.error)
  }, [])

  // Add to local storage
  //   const storeInLocalStorage = (task: object): void => {
  //     let savedTasks
  //     if (localStorage.getItem('savedTasks') === null) {
  //       savedTasks = []
  //     } else {
  //       savedTasks = JSON.parse(localStorage.getItem('savedTasks') || '')
  //     }
  //     savedTasks.push(task)
  //     localStorage.setItem('savedTasks', JSON.stringify(savedTasks))
  //   }

  // Remove from local storage
  //   function removeFromLocalStorage(id: string): void {
  //     let savedTasks = JSON.parse(localStorage.getItem('savedTasks') || '')
  //     for (let i = 0; i < savedTasks.length; i++) {
  //       if (savedTasks[i].id == id) {
  //         savedTasks.splice(i, 1)
  //       }
  //       localStorage.setItem('savedTasks', JSON.stringify(savedTasks))
  //     }
  //   }

  return (
    <Grid
      container
      spacing={0}
      sx={{
        height: '90vh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src={listItems}></img>
    </Grid>
  )
}
