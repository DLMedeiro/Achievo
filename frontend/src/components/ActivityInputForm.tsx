import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import { useNavigate } from 'react-router-dom'
import { createGoal } from '../features/goals/goalSlice'
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
import dayjs, { Dayjs } from 'dayjs'
import ActivitiesPage from '../pages/ActivitiesPage'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
// import DatePicker, { DateObject } from 'react-multi-date-picker'
import type { Value } from 'react-multi-date-picker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateField } from '@mui/x-date-pickers/DateField'

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
  // const [startValue, setStartValue] = React.useState<Dayjs | null>(null)
  // const [endValue, setEndValue] = React.useState<Dayjs | null>(null)
  const [value, setValue] = React.useState<Dayjs | null>(null)
  interface Inputs {
    start: string
    end: string
    activity: string
    target: string
  }

  const InitialFormValues = {
    start: '',
    end: '',
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
      start: data.start,
      end: data.end,
      activity: data.activity,
      target: data.target,
    }
    dispatch(createGoal(goalData))
    // navigate('/activities')
  }

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   const data = new FormData(event.currentTarget)

  //   if (startDate !== null && endDate !== null) {
  //     // console.log({
  //     //   start: startDate.format('LL'),
  //     //   end: endDate.format('LL'),
  //     //   activity: data.get('activity'),
  //     //   target: Number(data.get('target')),
  //     //   category: data.get('category'),
  //     // })
  //     onAddItem(
  //       startDate.format('LL'),
  //       endDate.format('LL'),
  //       activity,
  //       target,
  //       // data.get('activity')),
  //       // Number(data.get('target')),
  //       // Not sure why this data.get doesn't have issues but using data.get for activity did
  //       0,
  //     )
  //     setStartDate(dayjs('2022-04-17'))
  //     setEndDate(dayjs('2022-04-17'))
  //     setActivity('')
  //     setTarget(0)
  //     // setFormSubmit(true)
  //   }
  // }

  // console.log(startValue)

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3, marginBottom: '12px' }}
          >
            <Grid
              container
              spacing={0}
              sx={{
                marginBottom: '16px',
                paddingLeft: 0,
                paddingRight: 0,
                minWidth: '250px',
              }}
            >
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
                <TextField
                  required
                  fullWidth
                  id="start"
                  label="Start Date"
                  {...register('start')}
                />
                <div style={{ color: 'red' }}>{errors.start?.message}</div>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
                <TextField
                  required
                  fullWidth
                  label="end"
                  type="end"
                  id="end"
                  {...register('end')}
                ></TextField>

                <div style={{ color: 'red' }}>{errors.end?.message}</div>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
                <TextField
                  required
                  fullWidth
                  id="activity"
                  label="Activity"
                  {...register('activity')}
                />
                <div style={{ color: 'red' }}>{errors.activity?.message}</div>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
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
                  borderRadius: '40px',
                  margin: '0 auto',
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
