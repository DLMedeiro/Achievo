import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'

const theme = createTheme({
  palette: {
    primary: {
      main: '#114ea1',
      light: '#6189c2',
      dark: '#00003c',
    },
  },
})

interface ListFormProps {
  onAddItem: (
    start: string,
    end: string,
    activity: string,
    target: number,
    progress: number,
  ) => void
}

interface IFormInput {
  start: string
  end: string
  activity: string
  target: number
}

export default function ActivityInputForm({
  onAddItem,
}: ListFormProps): JSX.Element {
  // const [formData, setFormData] = useState({
  //   start: '',
  //   end: '',
  //   activity: '',
  //   target: 0,
  // })
  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs('2022-04-17'),
  )
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs('2022-04-17'),
  )
  const [activity, setActivity] = React.useState<string>('')
  const [target, setTarget] = React.useState<number>(0)

  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm<IFormInput>()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    if (startDate !== null && endDate !== null) {
      // console.log({
      //   start: startDate.format('LL'),
      //   end: endDate.format('LL'),
      //   activity: data.get('activity'),
      //   target: Number(data.get('target')),
      //   category: data.get('category'),
      // })
      onAddItem(
        startDate.format('LL'),
        endDate.format('LL'),
        activity,
        target,
        // data.get('activity')),
        // Number(data.get('target')),
        // Not sure why this data.get doesn't have issues but using data.get for activity did
        0,
      )
      setStartDate(dayjs('2022-04-17'))
      setEndDate(dayjs('2022-04-17'))
      setActivity('')
      setTarget(0)
    }
  }

  // const onSubmit: SubmitHandler<IFormInput> = (data) => {
  //   onAddItem(
  //     data.start,
  //     data.end,
  //     data.activity,
  //     data.target,
  //     data.category,
  //     0,
  //   )
  //   setFormData({
  //     start: '',
  //     end: '',
  //     activity: '',
  //     target: 0,
  //     category: '',
  //   })
  // }

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
            onSubmit={handleSubmit}
            sx={{ mt: 3, marginBottom: '12px' }}
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
              <Grid item xs={6} sx={{ marginBottom: '26px' }}>
                <DatePicker
                  label="Start Date"
                  defaultValue={dayjs('2022-04-17')}
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />

                {/* <TextField
                  required
                  fullWidth
                  id="start"
                  label="Start Date"
                  name="start"
                  autoComplete="Start Date"
                /> */}
              </Grid>
              <Grid item xs={6} sx={{ marginBottom: '26px' }}>
                <DatePicker
                  label="End Date"
                  defaultValue={dayjs('2022-04-17')}
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
                {/* <TextField
                  required
                  fullWidth
                  id="end"
                  label="Completion Date"
                  name="end"
                  autoComplete="Completion Date"
                /> */}
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
                <TextField
                  required
                  fullWidth
                  id="activity"
                  label="Activity Name"
                  name="activity"
                  autoComplete="Activity Name"
                  value={activity}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setActivity(event.target.value)
                  }}
                />
                {/* <input
                  {...register('activity', {
                    required: true,
                    minLength: 4,
                  })}
                />
                {errors.activity && 'Activity Name is required'} */}
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '26px' }}>
                <TextField
                  required
                  fullWidth
                  name="target"
                  label="Target"
                  type="target"
                  id="target"
                  autoComplete="Target"
                  value={target}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setTarget(Number(event.target.value))
                  }}
                />
                {/* <input
                  type="number"
                  {...register('target', { required: true, min: 1 })}
                />
                {errors.target && 'Target Time is required'} */}
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
                  width: '100%',
                }}
              >
                Submit
              </Button>
            </Grid>

            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            {/* <label>Activity Name</label>
      <input {...register("activityName", { required: true, minLength: 4 })} />
      {errors.activityName && "Activity Name is required"}
      <label>Target Time</label>
      <input type="number" {...register("timeTarget", { required: true, min: 1 })} />
      {errors.timeTarget && "Target Time is required"} */}
            {/* <input type="submit" />
    </form> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
