import React from 'react';
import Greeter from './components/Greeter';
import ActivityTracker from './components/ActivityTracker';
import WeeklyChart from "./components/WeeklyChart"
import './App.css';

function App() {




  return (
    <div>
      <Greeter person = "Maggie"/>
      <ActivityTracker/>
      <WeeklyChart/>
    </div>
  );
}

export default App;
