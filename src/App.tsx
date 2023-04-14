import React , {useState} from 'react';
import Greeter from './components/Greeter';
import TimeTracker from './components/TimeTracker';
import Item from './models/Item';
import ActivityForm from './components/ActivityForm';
import './App.css';

function App() {



  const [listItems, setListItems] = useState<Item[]>([])
  const addItem = (activityName: string,
    timeTarget: number) => {
    console.log("MADE TO THE APP COMPONENT!");
    setListItems([...listItems, { activityName, timeTarget }]);
  };

//   const listItems = [
//     {id: 1, activity: "Walk the Dog", target: 3, completed: 0},
//     {id: 2, activity: "Learn Typescript", target: 20, completed: 10}
// ]


  return (
    <div>
   <Greeter person = "Maggie"/>
   <TimeTracker listItems = {listItems}/>
   <ActivityForm onAddItem={addItem}/>
    </div>
  );
}

export default App;
