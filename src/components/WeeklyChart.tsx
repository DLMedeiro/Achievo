import React from 'react';
import { Chart } from "react-google-charts";


export default function WeeklyChart() {

    return (
        <Chart
        chartType="ScatterChart"
        data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
        width="100%"
        height="400px"
        legendToggle
        />

    )
}
