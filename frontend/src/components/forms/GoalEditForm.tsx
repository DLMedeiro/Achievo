import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import dayjs, { Dayjs } from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoItem } from '@mui/x-date-pickers/internals/demo'
import { getGoals, changeGoal } from '../../features/goals/goalSlice'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { Paper } from '@mui/material'

export default function ActivityInputForm() {
  interface Goal {
    _id: string
    user: string
    activity: string
    start: Date
    end: Date
    target: Number
    progress: Number
    createdAt: string
    updatedAt: string
    __v?: number
  }
  interface userState {
    user: any
  }
  interface goalState {
    goals: Goal[]
    isError: boolean
    isSuccess: boolean
    isLoading: boolean
    message: string | undefined
  }
  const { goals, isLoading, isError, message }: goalState = useAppSelector(
    (state: RootState) => state.goals,
  )

  const { user }: userState = useAppSelector((state: RootState) => state.auth)

  const [changeBtn, setChangeBtn] = useState(true)

  const [startValue, setStartValue] = React.useState<Dayjs | null>(dayjs(0))
  const [endValue, setEndValue] = React.useState<Dayjs | null>(dayjs(0))
  const [activityValue, setActivityValue] = React.useState<string>('')
  const [targetValue, setTargetValue] = React.useState<any>(0)
  const [progressValue, setProgressValue] = React.useState<Number>(0)
  const [idValue, setIdValue] = React.useState<string>('')

  let localGoal: Goal[]
  let localGoalString: string | null
  useEffect(() => {
    localGoalString = localStorage.getItem('goal')
    if (goals && goals.length == 1 && !localGoalString) {
      localStorage.setItem('goal', JSON.stringify(goals))
      localGoalString = localStorage.getItem('goal')
      if (localGoalString) {
        localGoal = JSON.parse(localGoalString)
      }
    } else if (goals && localGoalString)
      if (localGoalString) {
        localGoal = JSON.parse(localGoalString)
      }

    if (localGoal) {
      setIdValue(localGoal[0]._id)
      setStartValue(dayjs(localGoal[0].start))
      setEndValue(dayjs(localGoal[0].end))
      setActivityValue(localGoal[0].activity)
      setTargetValue(localGoal[0].target)
      setProgressValue(localGoal[0].progress)
    }
  }, [goals])

  const schema = z.object({
    start: z.any(),
    end: z.any(),
    // refactor to use only portion of date needed, so this can be more specific on the type
    activity: z
      .string()
      .min(3, { message: 'Please update, minimum length is 3 characters' }),
    target: z.number().nonnegative(),
    progress: z
      .number()
      .nonnegative()
      .min(0, { message: 'Value can not be less than 0' })
      .max(targetValue, {
        message: 'Value can not be larger than your target',
      }),
  })

  type Inputs = z.infer<typeof schema>

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (goals) {
      const goalData = {
        id: idValue,
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
      navigate(`/goals/user/${user.name}`)
      window.location.reload()
    }
  }

  return activityValue ? (
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
                  value={dayjs(startValue)}
                  onChange={(newValue) => setStartValue(newValue)}
                />
              </DemoItem>
            </Grid>
            <Grid item xs={12} className="dateLabel">
              <DemoItem label="Completion Date">
                <DatePicker
                  value={dayjs(endValue)}
                  onChange={(newValue) => setEndValue(newValue)}
                />
              </DemoItem>
            </Grid>
            <Grid item xs={12} className="dateLabel">
              <DemoItem label="Activity Name">
                <TextField
                  required
                  fullWidth
                  variant="filled"
                  margin="normal"
                  id="activity"
                  defaultValue={activityValue}
                  {...register('activity', {
                    onChange: (e) => {
                      setActivityValue(e.target.value)
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
                  id="Number of hours to complete goal"
                  defaultValue={targetValue}
                  {...register('target', {
                    valueAsNumber: true,
                    onChange: (e) => {
                      setTargetValue(e.target.value)
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
                  defaultValue={progressValue}
                  {...register('progress', {
                    valueAsNumber: true,
                    onChange: (e) => {
                      setProgressValue(e.target.value)
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
            >
              Save Changes
            </Button>
          </Grid>
        </Box>
      ) : (
        <Box className="form">
          <Link to={`/goals/user/${user._id}`}>
            <Button
              onClick={() => {
                setChangeBtn(true)
              }}
              variant="contained"
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
