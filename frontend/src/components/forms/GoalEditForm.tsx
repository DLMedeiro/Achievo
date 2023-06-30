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
  const goal = JSON.parse(localStorage.getItem('goal') || '')
  const { user }: userState = useAppSelector((state: RootState) => state.auth)

  const [startValue, setStartValue] = React.useState<Dayjs | null>(
    dayjs(goal.start),
  )
  const [endValue, setEndValue] = React.useState<Dayjs | null>(dayjs(goal.end))
  const [changingTarget, setChangingTarget] = React.useState<number>(
    goal.target,
  )
  const [changingProgress, setChangingProgress] = React.useState<number>(
    goal.target,
  )
  const [changeBtn, setChangeBtn] = useState(true)

  // const [value, setValue] = React.useState<Dayjs | null>(null)
  interface Inputs {
    start: Dayjs
    end: Dayjs
    activity: string
    target: number
    progress: number
  }

  const InitialFormValues = {
    start: dayjs(goal.start),
    end: dayjs(goal.end),
    // start: dayjs(),
    // end: dayjs(),
    activity: goal.activity,
    target: goal.target,
    progress: goal.progress,
  }

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
    defaultValues: InitialFormValues,
    resolver: zodResolver(schema),
  })

  // const changeEndDate = () => {
  //   return { ...register('end') }
  // }
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const goalData = {
      id: goal._id,
      start: startValue,
      end: endValue,
      activity: data.activity,
      target: data.target,
      progress: data.progress,
    }
    dispatch(changeGoal(goalData))
    dispatch(getGoals(user))
    setChangeBtn(false)
    // localStorage.removeItem('goal')
    // navigate(`/goals/user/${user._id}`)
    // window.location.reload()
  }

  return (
    <>
      {/* // <ThemeProvider theme={theme}> */}
      {changeBtn ? (
        <Container component="main">
          <Box
          // sx={{
          //   display: 'flex',
          //   flexDirection: 'column',
          //   alignItems: 'center',
          //   width: ' 100%',
          // }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              // sx={{ mt: 2, marginBottom: '12px' }}
            >
              <Grid
                container
                spacing={2}
                // sx={{
                //   marginBottom: '16px',
                //   paddingLeft: 0,
                //   paddingRight: 0,
                //   minWidth: '250px',
                // }}
              >
                <Grid item xs={6}>
                  <DemoItem label="Start Date">
                    <DatePicker
                      value={dayjs(startValue)}
                      onChange={(newValue) => setStartValue(newValue)}
                    />
                  </DemoItem>
                  <div style={{ color: 'red' }}>{errors.start?.message}</div>
                </Grid>
                <Grid item xs={6}>
                  <DemoItem label="Completion Date">
                    <DatePicker
                      value={dayjs(endValue)}
                      onChange={(newValue) => setEndValue(newValue)}
                    />
                  </DemoItem>
                  <div style={{ color: 'red' }}>{errors.end?.message}</div>
                </Grid>
                <Grid item xs={12}>
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
                    type="number"
                    id="target"
                    {...register('target', {
                      valueAsNumber: true,
                      onChange: (e) => {
                        setChangingTarget(e.target)
                      },
                    })}
                  />
                  <div style={{ color: 'red' }}>{errors.target?.message}</div>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    label="progress"
                    type="number"
                    id="progress"
                    {...register('progress', {
                      valueAsNumber: true,
                      onChange: (e) => {
                        setChangingProgress(e.target)
                      },
                    })}
                  />
                  <div style={{ color: 'red' }}>{errors.progress?.message}</div>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
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
          </Box>
        </Container>
      ) : (
        <Container component="main">
          <Box
          // sx={{
          //   display: 'flex',
          //   flexDirection: 'column',
          //   alignItems: 'center',
          //   width: ' 100%',
          // }}
          >
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
        </Container>
      )}
      {/* </ThemeProvider> */}
    </>
  )
}
