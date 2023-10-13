import React, { useEffect } from 'react'
import '../../styles/Material.css'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store'
import { useNavigate } from 'react-router-dom'
import { createGoal } from '../../features/goals/goalSlice'
import { useForm, SubmitHandler } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import dayjs, { Dayjs } from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { DatePicker  } from '@mui/x-date-pickers/DatePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DemoItem } from '@mui/x-date-pickers/internals/demo'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { makeStyles } from '@material-ui/core/styles';



export default function ActivityInputForm() {


  const [startValue, setStartValue] = React.useState<Dayjs | any>(
    dayjs(new Date()),
  )
  const [endValue, setEndValue] = React.useState<Dayjs | null>(
    dayjs(new Date()),
  )
  interface Inputs {
    start: Dayjs
    end: Dayjs
    activity: string
    target: number | string
  }

  const InitialFormValues = {
    start: dayjs(new Date()).format('LL'),
    end: dayjs(new Date()).format('LL'),
    activity: '',
    target: "",
  }

  const schema = z.object({
    start: z.string().min(1, { message: 'Please enter your start date' }),
    end: z.string().min(1, { message: 'Please enter your completion date' }),
    activity: z.string().min(3, { message: 'Please enter your activity' }),
    target: z
      .number()
      .positive()
      .min(1, { message: 'Please enter your target time commitment goal' }),
  })

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: InitialFormValues,
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const goalData = {
      start: startValue,
      end: endValue,
      activity: data.activity,
      target: data.target,
    }
    dispatch(createGoal(goalData))
    // window.location.reload()
  }

  useEffect(() => {}, [startValue])


  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Create a new goal</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="form"
          className="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{textAlign:"center"}}
        >
          <Grid container spacing={0}>
            <Grid item xs={12} sx={{paddingTop: "1rem"}}>
          <div className="goalText">Beginning </div>
           <MobileDatePicker 
  
                format= 'dddd MMMM DD, YYYY'
                  value={startValue}
                  onChange={(newValue) => setStartValue(newValue)}
                  sx={{
                    "& fieldset": { border: 'none'}
                  }}
            />
              {errors.start?.message ? (<div style={{ color: 'red' }}>{errors.start?.message}</div>) : ("")}

            <div className="goalText"> through </div>
            <MobileDatePicker
                format= 'dddd MMMM DD, YYYY'
                
                  value={endValue}
                  onChange={(newValue) => setEndValue(newValue)}
                  sx={{
                    "& fieldset": { border: 'none'}
                    
                  }}
            />
             {errors.end?.message ? (<div style={{ color: 'red' }}>{errors.end?.message}</div>) : ("")}

            </Grid>
            <Grid item xs={12} sx={{paddingTop: "1rem"}}>
            <div className="goalText">
            I plan to commit </div>

            <TextField
                required
                // fullWidth
                // label="Number"
                type="number"
                id="target"
                variant="standard"
                {...register('target', {
                  valueAsNumber: true,
                })}
              />

              <div className="goalText">
               hours achieving my goal of:
              </div>
              {errors.target?.message ? (<div style={{ color: 'red' }}>{errors.target?.message}</div>) : ("")}
            </Grid>
            <Grid item xs={12} sx={{paddingTop: "1rem"}}>
            <div className="goalText">
            <TextField
                required
                fullWidth
                variant="filled"
                margin="normal"
                id="activity"
                label="Enter the goal you would like to achieve."
                {...register('activity')}
              />
              <div style={{ color: 'red' }}>{errors.activity?.message}</div>
            </div>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="btn"
            >
              Create Goal
            </Button>
        </Grid>
            
          {/* <Grid container spacing={0}>
            <Grid item xs={12}>
              <DemoItem label="Start Date*">
              </DemoItem>
                <DatePicker
                format= 'dddd MMMM DD, YYYY'
                  value={startValue}
                  onChange={(newValue) => setStartValue(newValue)}
                />
              <div style={{ color: 'red' }}>{errors.start?.message}</div>
            </Grid>
            <Grid item xs={12}>
              <DemoItem label="Completion Date*">
                <DatePicker
                format= 'dddd MMMM DD, YYYY'
                  value={endValue}
                  onChange={(newValue) => setEndValue(newValue)}
                />
              </DemoItem>
              <div style={{ color: 'red' }}>{errors.end?.message}</div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="filled"
                margin="normal"
                id="activity"
                label="Enter the goal you would like to achieve"
                {...register('activity')}
              />
              <div style={{ color: 'red' }}>{errors.activity?.message}</div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Determine your measurement for success"
                type="number"
                id="target"
                variant="filled"
                margin="normal"
                {...register('target', {
                  valueAsNumber: true,
                })}
              />
              <div style={{ color: 'red' }}>{errors.target?.message}</div>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="btn"
            >
              Create Goal
            </Button>
          </Grid> */}
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
