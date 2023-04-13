import React from "react";

interface GreeterProps {
    person:string;
}

function Greeter({person}:GreeterProps): JSX.Element {

    return (
        <header>
            <h1>Time Management Tracker</h1>
            <h2>Hello, {person} </h2>
        </header>
    )


} export default Greeter;