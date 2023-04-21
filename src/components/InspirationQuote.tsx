import React, { useState, useEffect } from 'react'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import HeroImage from '../images/HeroImage.jpg'
import axios from 'axios'

type Props = { text: string; author: string }

export default function InspirationQuote({ text, author }: Props) {
  return (
    <>
      <Grid item xs={12} sx={{ fontSize: '2rem' }}>
        <h4>"{text}"</h4>
        <h6>
          <Link
            href={`https://en.wikipedia.org/wiki/${author}`}
            underline="hover"
            target="_blank"
            rel="noopener"
          >
            {author}
          </Link>
        </h6>
        {/* rel="noopener" prevents the new page from being able to access the window.opener property and ensures it runs in a separate process. Without this, the target page can potentially redirect your page to a malicious URL. */}
      </Grid>
    </>
  )
}
