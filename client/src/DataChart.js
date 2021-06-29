import React from "react";
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  ReferenceLine
} from "recharts";

export default function DataChart(props) {
  // const chartData = props.chartData;
  // const chartData = [
  //   {time: '12:06', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, 
  //   {time: '12:07', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, {time: '', dB:0}, 
  //   {time: '12:08', dB:85}, {time: '', dB:77}, {time: '', dB:78}, {time: '', dB:70}, {time: '', dB:70}, {time: '', dB:68}, {time: '', dB:60}, {time: '', dB:61}, {time: '', dB:82}, {time: '', dB:78}, {time: '', dB:61}, {time: '', dB:73}, 
  //   {time: '12:09', dB:83}, {time: '', dB:87}, {time: '', dB:86}, {time: '', dB:61}, {time: '', dB:67}, {time: '', dB:70}, {time: '', dB:63}, {time: '', dB:80}, {time: '', dB:64}, {time: '', dB:66}, {time: '', dB:76}, {time: '', dB:72}, 
  //   {time: '12:10', dB:60}, {time: '', dB:80}, {time: '', dB:66}, {time: '', dB:87}, {time: '', dB:84}, {time: '', dB:61}, {time: '', dB:61}, {time: '', dB:75}, {time: '', dB:82}, {time: '', dB:86}, {time: '', dB:73}, {time: '', dB:63} 
  //   ]
  const chartData =
    [{ "time": "1112321321321", "dB": 88 }, { "time": "", "dB": 74 }, { "time": "", "dB": 83 }, { "time": "", "dB": 61 }, { "time": "", "dB": 77 }, { "time": "", "dB": 88 }, { "time": "", "dB": 64 }, { "time": "", "dB": 82 }, { "time": "", "dB": 80 }, { "time": "", "dB": 84 }, { "time": "", "dB": 83 }, { "time": "", "dB": 69 }, { "time": "1112321321322", "dB": 88 }, { "time": "", "dB": 74 }, { "time": "", "dB": 83 }, { "time": "", "dB": 61 }, { "time": "", "dB": 77 }, { "time": "", "dB": 88 }, { "time": "", "dB": 64 }, { "time": "", "dB": 82 }, { "time": "", "dB": 80 }, { "time": "", "dB": 84 }, { "time": "", "dB": 83 }, { "time": "", "dB": 69 }, { "time": "1112321321323", "dB": 88 }, { "time": "", "dB": 74 }, { "time": "", "dB": 83 }, { "time": "", "dB": 61 }, { "time": "", "dB": 77 }, { "time": "", "dB": 88 }, { "time": "", "dB": 64 }, { "time": "", "dB": 82 }, { "time": "", "dB": 80 }, { "time": "", "dB": 84 }, { "time": "", "dB": 83 }, { "time": "", "dB": 69 }, { "time": "1112321321324", "dB": 88 }, { "time": "", "dB": 74 }, { "time": "", "dB": 83 }, { "time": "", "dB": 61 }, { "time": "", "dB": 77 }, { "time": "", "dB": 88 }, { "time": "", "dB": 64 }, { "time": "", "dB": 82 }, { "time": "", "dB": 80 }, { "time": "", "dB": 84 }, { "time": "", "dB": 83 }, { "time": "", "dB": 69 }, { "time": "1112321321325", "dB": 88 }, { "time": "", "dB": 74 }, { "time": "", "dB": 83 }, { "time": "", "dB": 61 }, { "time": "", "dB": 77 }, { "time": "", "dB": 88 }, { "time": "", "dB": 64 }, { "time": "", "dB": 82 }, { "time": "", "dB": 80 }, { "time": "", "dB": 84 }, { "time": "", "dB": 83 }, { "time": "", "dB": 69 }]
  
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
      <XAxis dataKey="time" interval={0} />
      <YAxis type="number" domain={['dataMin', 'dataMax']} />
      <Tooltip />
      <Legend />
      <Bar barSize={5} dataKey="dB" fill="#8884d8" />
      <ReferenceLine y={80} label="Noise limit: 80 dB" stroke="red" strokeDasharray="3 3" />
    </ComposedChart>
  );
}