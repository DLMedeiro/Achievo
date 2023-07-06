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
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
// import DatePicker, { DateObject } from 'react-multi-date-picker'
import type { Value } from 'react-multi-date-picker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateField } from '@mui/x-date-pickers/DateField'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { getGoals, changeGoal } from '../../features/goals/goalSlice'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { Paper } from '@mui/material'

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#114ea1',
//       light: '#6189c2',
//       dark: '#00003c',
//     },
//   },
// })

export default function ActivityInputForm() {
  interface userState {
    user: any
  }
  interface goalState {
    goals: any
  }
  // const goal = JSON.parse(localStorage.getItem('goal') || '')
  const { goals }: goalState = useAppSelector((state: RootState) => state.goals)
  const { user }: userState = useAppSelector((state: RootState) => state.auth)
  interface Goal {
    _id: string
    user: string
    activity: string
    start: Date
    end: Date
    target: number
    progress: number
    createdAt: string
    updatedAt: string
    __v?: number
  }

  const localGoalString = localStorage.getItem('goal')
  const localGoal: Goal | null = localGoalString
    ? JSON.parse(localGoalString)
    : null

  // const [startValue, setStartValue] = React.useState<Dayjs | null>(dayjs())
  // const [endValue, setEndValue] = React.useState<Dayjs | null>(dayjs())
  // const [changingTarget, setChangingTarget] = React.useState<number>(0)
  // const [changingProgress, setChangingProgress] = React.useState<number>(0)
  const [changeBtn, setChangeBtn] = useState(true)
  const [initialFormValues, setInitialFormValues] = useState({
    start: dayjs(),
    end: dayjs(),
    // start: dayjs(),
    // end: dayjs(),
    activity: '',
    target: 0,
    progress: 0,
  })

  const [startValue, setStartValue] = React.useState<Dayjs | null>(
    dayjs(initialFormValues.start),
  )
  const [endValue, setEndValue] = React.useState<Dayjs | null>(
    dayjs(initialFormValues.end),
  )
  const [activity, setActivity] = React.useState<Dayjs | null>(
    dayjs(initialFormValues.activity),
  )
  const [changingTarget, setChangingTarget] = React.useState<number>(
    initialFormValues.target,
  )
  const [changingProgress, setChangingProgress] = React.useState<number>(
    initialFormValues.progress,
  )

  // const [value, setValue] = React.useState<Dayjs | null>(null)
  interface Inputs {
    start: Dayjs
    end: Dayjs
    activity: string
    target: number
    progress: number
  }

  useEffect(() => {
    if (localGoal) {
      console.log(localGoal)
      setInitialFormValues({
        start: dayjs(localGoal.start),
        end: dayjs(localGoal.end),
        // start: dayjs(),
        // end: dayjs(),
        activity: localGoal.activity,
        target: localGoal.target,
        progress: localGoal.progress,
      })
    }
  }, [])

  const schema = z.object({
    start: z.any(),
    end: z.any(),
    // refactor to use only portion of date needed, so this can be more specific on the type
    activity: z.string().min(3, { message: 'Please enter your activity' }),
    target: z.number().nonnegative().min(changingProgress, {
      message: 'Value can not be less than your current progress',
    }),
    progress: z
      .number()
      .gte(0, { message: 'Value can not be less than 0' })
      .lte(changingTarget, {
        message: 'Value can not be larger than your target',
      }),
  })

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: initialFormValues,
    resolver: zodResolver(schema),
  })

  // const changeEndDate = () => {
  //   return { ...register('end') }
  // }
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const goalData = {
      id: goals._id,
      start: startValue,
      end: endValue,
      activity: data.activity,
      target: data.target,
      progress: data.progress,
    }
    dispatch(changeGoal(goalData))
    dispatch(getGoals(user))
    setChangeBtn(false)
    localStorage.removeItem('goal')
    console.log(goalData)
    // navigate(`/goals/user/${user._id}`)
    // window.location.reload()
  }

  return localGoal ? (
    <Paper elevation={14} className="form-container">
      <Typography variant="h5" component="h5" align="center">
        Update Goal
      </Typography>
      {changeBtn ? (
        <Box
          component="form"
          className="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={0}>
            <Grid item xs={12} className="dateLabel">
              <DemoItem label="Start Date">
                <DatePicker
                  value={dayjs(localGoal.start)}
                  onChange={(newValue) => setStartValue(newValue)}
                />
              </DemoItem>
              <div style={{ color: 'red' }}>{errors.start?.message}</div>
            </Grid>
            <Grid item xs={12} className="dateLabel">
              <DemoItem label="Completion Date">
                <DatePicker
                  value={dayjs(localGoal.end)}
                  onChange={(newValue) => setEndValue(newValue)}
                />
              </DemoItem>
              <div style={{ color: 'red' }}>{errors.end?.message}</div>
            </Grid>
            <Grid item xs={12} className="dateLabel">
              <DemoItem label="Activity Name">
                <TextField
                  required
                  fullWidth
                  variant="filled"
                  margin="normal"
                  id="activity"
                  value={localGoal.activity}
                  {...register('activity', {
                    onChange: (e) => {
                      setActivity(e.target)
                    },
                  })}
                />
                <div style={{ color: 'red' }}>{errors.activity?.message}</div>
              </DemoItem>
            </Grid>
            <Grid item xs={12} className="dateLabel">
              <DemoItem label="Target">
                <TextField
                  required
                  fullWidth
                  variant="filled"
                  margin="normal"
                  type="number"
                  id="target"
                  value={localGoal.target}
                  {...register('target', {
                    valueAsNumber: true,
                    onChange: (e) => {
                      setChangingTarget(e.target)
                    },
                  })}
                />
                <div style={{ color: 'red' }}>{errors.target?.message}</div>
              </DemoItem>
            </Grid>
            <Grid item xs={12} className="dateLabel">
              <DemoItem label="Progress">
                <TextField
                  required
                  fullWidth
                  variant="filled"
                  margin="normal"
                  type="number"
                  id="progress"
                  value={localGoal.progress}
                  {...register('progress', {
                    valueAsNumber: true,
                    onChange: (e) => {
                      setChangingProgress(e.target)
                    },
                  })}
                />
                <div style={{ color: 'red' }}>{errors.progress?.message}</div>
              </DemoItem>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="btn"
              // sx={{
              //   mt: 3,
              //   mb: 2,
              //   mx: 'auto',
              //   borderRadius: '40px',
              //   display: 'flex',
              // }}
            >
              Save Changes
            </Button>
          </Grid>
        </Box>
      ) : (
        <Box className="form">
          <Link
            to={`/goals/user/${user._id}`}
            // style={{ textDecoration: 'none', margin: '1rem' }}
          >
            <Button
              onClick={() => {
                setChangeBtn(true)
              }}
              variant="contained"
              // sx={{
              //   mt: 3,
              //   mb: 2,
              //   borderRadius: '40px',
              //   margin: '0 auto',
              // }}
            >
              Changes saved - Return to Dashboard
            </Button>
          </Link>
        </Box>
      )}
    </Paper>
  ) : (
    <></>
  )
}
