// Modified from Material UI Docs: https://github.com/mui/material-ui/blob/v5.12.1/docs/data/material/getting-started/templates/sign-up/SignUp.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
// useAppSelector: Select from the state
// useAppDispatch: Dispatch a function like register, or reset
import { createFeedback, reset } from "../../features/feedback/feedbackSlice";
import { RootState } from "../../app/store";

export default function Feedback() {
  type Inputs = {
    feedback: string;
  };
  const InitialFormValues = {
    feedback: "",
  };
  const schema = z.object({
    feedback: z.string().min(2, { message: "Please enter your feedback" }),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { feedback, isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.feedback
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error("Input required");
    }
    // if (isSuccess && user) {
    //   navigate(`/goals/user/${user.name}`)
    //   // navigate(`/goals/user/${user._id}`)
    // }

    dispatch(reset());
  }, [feedback, isError, isSuccess, message, navigate, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: InitialFormValues,
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const feedbackData = { feedback: data.feedback };
    dispatch(createFeedback(feedbackData));
  };

  // Add error handling within the signup form
  return (
    <Box
      component="form"
      className="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            variant="filled"
            margin="normal"
            id="feedback"
            label="Feedback"
            autoComplete="Please enter your feedback"
            {...register("feedback")}
          />
          <div style={{ color: "red" }}>{errors.feedback?.message}</div>
        </Grid>

        <Button variant="contained" type="submit" className="btn">
          Submit
        </Button>
        <ToastContainer />
      </Grid>
    </Box>
  );
}
