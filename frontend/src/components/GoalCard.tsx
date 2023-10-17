import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import Paper from "@mui/material/Paper";
import "../styles/App.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getOneGoal,
  deleteGoal,
  updateProgress,
} from "../features/goals/goalSlice";
import { useNavigate } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { RootState } from "../app/store";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

interface userState {
  user: any;
}

export default function Activity({ goal }: { goal: any }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user }: userState = useAppSelector((state: RootState) => state.auth);

  const [progress, setProgress] = useState(goal.progress);

  const [percentComplete, setPercentComplete] = React.useState<number>(
    Math.round((goal.progress / goal.target) * 100)
  );
  const [completed, setCompleted] = useState(false);
  const [boxShadow, setBoxShadow] = useState(
    "0px 7px 9px -4px rgb(0 0 0 / 20%), 0px 14px 21px 2px rgb(0 0 0 / 14%), 0px 5px 26px 4px rgb(0 0 0 / 12%)"
  );
  const [borderColor, setBorderColor] = useState("transparent");

  const [duration, setDuration] = React.useState<number>();

  useEffect(() => {
    let today = dayjs().format("LL");

    let hours = dayjs(goal.end).diff(today, "hours");
    const days = Math.floor(hours / 24);
    setDuration(days);
  }, []);

  useEffect(() => {
    {
      progress === 0 && progress < goal.target
        ? setPercentComplete(0)
        : setPercentComplete(Math.round((progress / goal.target) * 100));
      // Rounding not exact but works for current need
    }
  }, [progress, goal.target]);

  useEffect(() => {
    if (progress >= goal.target) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [progress]);

  const addProgress = () => {
    // updating the database
    dispatch(updateProgress({ id: goal._id, change: "add", user: user._id }));

    // Update the UI

    if (progress + 0.5 <= goal.target) {
      setProgress(progress + 0.5);
    }
  };

  const subtractProgress = () => {
    dispatch(
      updateProgress({ id: goal._id, change: "subtract", user: user._id })
    );
    if (progress > 0) {
      setProgress(progress - 0.5);
    }
  };
  const editActivity = () => {
    dispatch(getOneGoal(goal._id));
    navigate(`/goalEditForm`);
  };

  const deleteItem = () => {
    dispatch(deleteGoal(goal._id));
    // window.location.reload()
  };

  useEffect(() => {
    if (completed) {
      setBoxShadow(
        "0px 7px 9px -4px rgb(48 245 254 / 20%), 0px 14px 21px 2px rgb(48 245 254 / 14%), 0px 5px 26px 4px rgb(348 245 254 / 12%)"
      );
      setBorderColor("#1e5b5e");
    } else {
      setBoxShadow(
        "0px 7px 9px -4px rgb(0 0 0 / 20%), 0px 14px 21px 2px rgb(0 0 0 / 14%), 0px 5px 26px 4px rgb(0 0 0 / 12%)"
      );
      setBorderColor(" transparent");
    }
  }, [completed]);

  return (
    <Paper
      elevation={14}
      className="form group"
      variant="outlined"
      sx={{
        boxShadow: { boxShadow },
        border: `5px solid ${borderColor}`,
      }}
    >
      <Grid container spacing={0} key={goal._id}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {completed ? (
                <>
                  <DoneOutlineIcon
                    style={{ color: "#1e5b5e", marginRight: "10px" }}
                  />
                  {goal.activity}
                </>
              ) : (
                <>{goal.activity}</>
              )}
            </AccordionSummary>
            {/* </Grid> */}

            <AccordionDetails>
              <Grid item xs={12}>
                <Typography variant="caption">
                  {new Date(goal.start).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(goal.end).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  onClick={editActivity}
                  className="link"
                >
                  Edit Goal
                </Typography>{" "}
                |{" "}
                <Typography
                  variant="caption"
                  onClick={deleteItem}
                  className="link"
                >
                  Delete Goal
                </Typography>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {!completed ? (
          <Grid
            container
            columnSpacing={0}
            rowSpacing={1}
            key={goal.id}
            id="goal-container"
          >
            <Grid item xs={2}>
              <RemoveIcon onClick={subtractProgress} id="btn-math" />
            </Grid>

            <Grid item xs={8}>
              <div className="progress">
                <div
                  id="progress-done"
                  style={{ width: `${percentComplete}%` }}
                >
                  <p>{percentComplete}%</p>
                </div>
              </div>
            </Grid>

            <Grid item xs={2}>
              <AddIcon onClick={addProgress} id="btn-math" />
            </Grid>
            <Grid item xs={12} id="center">
              <Typography variant="caption">
                {progress} of {goal.target} hours completed with {duration}{" "}
                {duration == 1 ? "Day Remaining" : "Days Remaining"}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            columnSpacing={0}
            rowSpacing={1}
            key={goal.id}
            id="goal-container"
          >
            <Grid item xs={12}>
              <div className="progress">
                <div
                  id="progress-done"
                  style={{ width: `${percentComplete}%` }}
                >
                  <p>
                    <b>
                      {progress} of {goal.target} hour target completed!
                    </b>
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
