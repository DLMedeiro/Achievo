import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store'
import { useNavigate } from 'react-router-dom'
import { createGoal } from '../../features/goals/goalSlice'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { Dayjs } from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const theme = createTheme({
  palette: {
    primary: {
      main: '#114ea1',
      light: '#6189c2',
      dark: '#00003c',
    },
  },
})

export default function ActivityEditForm() {
  const [activity, setActivity] = useState<string>('')
  const [end, setEnd] = useState<string>('')
  const [start, setStart] = useState<string>('')
  const [target, setTarget] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    let changingGoal = JSON.parse(localStorage.getItem('goal') || '')
    if (changingGoal.activity) {
      setActivity(changingGoal.activity)
      setEnd(changingGoal.end)
      setStart(changingGoal.start)
      setTarget(changingGoal.target)
      setProgress(changingGoal.progress)
    }
  }, [])

  console.log(activity)
  console.log(end)
  console.log(start)
  console.log(target)
  console.log(progress)

  interface Inputs {
    start: string
    end: string
    activity: string
    target: string
    progress: number
  }

  const InitialFormValues = {
    start: start,
    end: end,
    activity: activity,
    target: target,
    progress: progress,
  }

  const schema = z.object({
    start: z.string(),
    end: z.string(),
    activity: z.string().min(3, { message: 'Please enter your activity' }),
    target: z
      .string()
      .min(1, { message: 'Please enter your target time commitment goal' }),
    progress: z.number(),
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    const goalData = {
      start: data.start,
      end: data.end,
      activity: data.activity,
      target: data.target,
      progress: data.progress,
    }
    // dispatch(editGoal(goalData))
    navigate('/activities')
  }

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
                <p>Start Date</p>
                <TextField
                  defaultValue={start}
                  required
                  fullWidth
                  id="start"
                  label="Start Date"
                  {...register('start')}
                />
                <div style={{ color: 'red' }}>{errors.start?.message}</div>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
                <p>End Date</p>
                <TextField
                  required
                  fullWidth
                  defaultValue={end}
                  label="end"
                  type="end"
                  id="end"
                  {...register('end')}
                ></TextField>

                <div style={{ color: 'red' }}>{errors.end?.message}</div>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
                <p>Activity</p>
                <TextField
                  required
                  fullWidth
                  defaultValue={activity}
                  id="activity"
                  label="Activity"
                  {...register('activity')}
                />
                <div style={{ color: 'red' }}>{errors.activity?.message}</div>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
                <p>Target</p>
                <TextField
                  required
                  fullWidth
                  defaultValue={target}
                  label="target"
                  type="text"
                  id="target"
                  {...register('target')}
                />
                <div style={{ color: 'red' }}>{errors.target?.message}</div>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
                <p>Progress</p>
                <TextField
                  required
                  fullWidth
                  defaultValue={progress}
                  label="Progress"
                  type="text"
                  id="progress"
                  {...register('progress')}
                />
                <div style={{ color: 'red' }}>{errors.progress?.message}</div>
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
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
