import React, { useState, useEffect } from 'react'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import HeroImage from '../images/HeroImage.jpg'
import axios from 'axios'

export default function InspirationQuote() {
  const [quote, setQuote] = React.useState([])

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

  return (
    <>
      <Grid item xs={12} sx={{ fontSize: '2rem' }}>
        <h4>{quote[0]}</h4>
        <h6>
          <Link
            href={`https://en.wikipedia.org/wiki/${quote[1]}`}
            underline="hover"
            target="_blank"
            rel="noopener"
          >
            {quote[1]}
          </Link>
        </h6>
        {/* rel="noopener" prevents the new page from being able to access the window.opener property and ensures it runs in a separate process. Without this, the target page can potentially redirect your page to a malicious URL. */}
      </Grid>
    </>
  )
}
