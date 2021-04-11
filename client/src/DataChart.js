import React from "react";
import {
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ComposedChart
  } from "recharts";

export default function DataChart(props) {
    const chartData = props.chartData;

    return (
      <ComposedChart
        width={800}
        height={500}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis type="number" domain={['dataMin', 'dataMax']}/>
        <Tooltip />
        <Legend />
        <Bar barSize={20} dataKey="dB" fill="#8884d8" />
        <Line type="monotone" dataKey="dBavg" stroke="#82ca9d" activeDot={{ r: 8 }}/>
      </ComposedChart>
    );
  }