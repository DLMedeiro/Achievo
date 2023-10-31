import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { RootState } from "../app/store";
import CircularIndeterminate from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalCard from "../components/GoalCard";
import GoalInputForm from "../components/forms/GoalInputForm";

import { TransitionGroup } from "react-transition-group";

function Dashboard() {
  const [pulseTrue, setPulseTrue] = useState(false);
  const [open, setOpen] = useState(false);

  localStorage.removeItem("goal");
  localStorage.removeItem("details");
  // Clean up after goal is edited - local storage used to manage the changes prior to sending put request
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  interface userState {
    user: any;
  }
  interface Goal {
    _id: string;
    user: string;
    activity: string;
    start: Date;
    end: Date;
    target: Number;
    progress: Number;
    createdAt: string;
    updatedAt: string;
    __v?: number;
  }
  interface goalState {
    goals: Goal[];
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string | undefined;
  }

  const { user }: userState = useAppSelector((state: RootState) => state.auth);
  const { goals, isLoading, isError, message }: goalState = useAppSelector(
    (state: RootState) => state.goals
  );

  useEffect(() => {
    if (goals.length > 0 || open) {
      setPulseTrue(false);
    } else {
      setPulseTrue(true);
    }
  }, [open, goals]);

  // Figure out how to have the new change populate after completing the edit

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    // dispatch(getGoals(user))

    // clear goals when the component unmounts
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    dispatch(getGoals(user));
  }, []);

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <>
      <section>
        <h1>Welcome Back {user && user.name}!</h1>
      </section>

      <div
        id="step1"
        className={pulseTrue ? "pulse" : ""}
        onClick={() => setOpen(true)}
      >
        <GoalInputForm />
      </div>

      {/* goals */}

      {goals && goals.length > 0 ? (
        <>
          <TransitionGroup />
          {goals.map((goal) => (
            <GoalCard key={goal._id} goal={goal} />
          ))}
        </>
      ) : (
        <>
          <h3>You have not set any goals</h3>
        </>
      )}
    </>
  );
}

export default Dashboard;
