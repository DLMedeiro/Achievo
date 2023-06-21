import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store'
import { useNavigate } from 'react-router-dom'
import { createGoal } from '../../features/goals/goalSlice'
import ReactDOM from 'react-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
// import DatePicker, { DateObject } from 'react-multi-date-picker'
import type { Value } from 'react-multi-date-picker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateField } from '@mui/x-date-pickers/DateField'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'

const theme = createTheme({
  palette: {
    primary: {
      main: '#114ea1',
      light: '#6189c2',
      dark: '#00003c',
    },
  },
})

// interface ListFormProps {
//   onAddItem: (
//     start: string,
//     end: string,
//     activity: string,
//     target: number,
//     progress: number,
//   ) => void
// }

export default function ActivityInputForm() {
  const [startValue, setStartValue] = React.useState<Dayjs | null>(null)
  const [endValue, setEndValue] = React.useState<Dayjs | null>(null)
  // const [value, setValue] = React.useState<Dayjs | null>(null)
  interface Inputs {
    start: Dayjs
    end: Dayjs
    activity: string
    target: string
  }

  const InitialFormValues = {
    start: dayjs().format('LL'),
    end: dayjs().format('LL'),
    // start: dayjs(),
    // end: dayjs(),
    activity: '',
    target: '',
  }

  const schema = z.object({
    start: z.string(),
    end: z.string(),
    activity: z.string().min(3, { message: 'Please enter your activity' }),
    target: z
      .string()
      .min(1, { message: 'Please enter your target time commitment goal' }),
  })

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { goals } = useAppSelector((state: RootState) => state.goals)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: InitialFormValues,
    resolver: zodResolver(schema),
  })

  // const changeEndDate = () => {
  //   return { ...register('end') }
  // }
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    const goalData = {
      start: startValue,
      end: endValue,
      activity: data.activity,
      target: data.target,
    }
    dispatch(createGoal(goalData))

    window.location.reload()
    // Refactor / solve issue of component no reloading when item is deleted or addedd
    navigate('/activities')
  }

  useEffect(() => {}, [startValue])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: ' 100%',
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 2, marginBottom: '12px' }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                marginBottom: '16px',
                paddingLeft: 0,
                paddingRight: 0,
                minWidth: '250px',
              }}
            >
              <Grid item xs={6}>
                <DemoItem label="Start Date">
                  <DatePicker
                    value={startValue}
                    onChange={(newValue) => setStartValue(newValue)}
                  />
                </DemoItem>
                <div style={{ color: 'red' }}>{errors.start?.message}</div>
              </Grid>
              <Grid item xs={6}>
                <DemoItem label="Completion Date">
                  <DatePicker
                    value={endValue}
                    onChange={(newValue) => setEndValue(newValue)}
                  />
                </DemoItem>
                <div style={{ color: 'red' }}>{errors.end?.message}</div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="activity"
                  label="Activity"
                  {...register('activity')}
                />
                <div style={{ color: 'red' }}>{errors.activity?.message}</div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="target"
                  type="text"
                  id="target"
                  {...register('target')}
                />
                <div style={{ color: 'red' }}>{errors.target?.message}</div>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  mb: 2,
                  mx: 'auto',
                  borderRadius: '40px',
                  display: 'flex',
                }}
              >
                Create Goal
              </Button>
              {/* <p>{loginStatus}</p> */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
