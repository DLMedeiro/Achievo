import { useState } from "react";
// import './styles/Material.css'
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import LoginForm from "./pages/LoginPage";
import Appbar from "./components/Appbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import Item from "./models/Item";
import "./styles/Utilities.css";
import "./styles/SnakeGame.css";
import { useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CreateAccount from "./pages/CreateAccount";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GoalEditForm from "./components/forms/GoalEditForm";

function App() {
  interface userState {
    user: any;
  }

  const { user }: userState = useAppSelector((state: RootState) => state.auth);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Appbar />
      <Container maxWidth="md" className="top-container">
        {user ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path={`/goals/user/${user.name}`} element={<Dashboard />} />
            <Route path={`/goalEditForm`} element={<GoalEditForm />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/createAccount" element={<CreateAccount />} />
          </Routes>
        )}
      </Container>
    </LocalizationProvider>
  );
}

export default App;
