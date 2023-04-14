import React , {useState} from 'react';
import Greeter from './components/Greeter';
import ActivityTracker from './components/ActivityTracker';
import Item from './models/Item';

import './App.css';

function App() {




  return (
    <div>
      <Greeter person = "Maggie"/>
      <ActivityTracker/>
    </div>
  );
}

export default App;
