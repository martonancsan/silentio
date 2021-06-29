import React from "react";
// import DataTable from "./DataTable";
import DataChart from "./DataChart";
// import Client from "./Client";
// const MATCHING_ITEM_LIMIT = 25;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: defaultData
    };
    this.loadData = this.loadData.bind(this);
    this.clearData = this.clearData.bind(this);
  }


  async loadData() {
    let measurementData = await getData();
    this.setState({
      chartData: measurementData
    })
  }

  async clearData() {
    this.setState({
      chartData: defaultData
    });
  }

  render() {
    const { chartData } = this.state;

    return (
      <div className="App">
        <div>
          <DataChart chartData={chartData} />
          <RefreshButton callback={this.loadData} />
          <ClearButton callback={this.clearData} />
        </div>
      </div>
    );
  }
}


function parseJSON(response) {
  return response.json();
}

function getData(cb) {
  return fetch(`measurementData`, {
    accept: "application/json"
  })
    .then(parseJSON);
}


function RefreshButton(props) {
  return (
    <div className="loadButton">
      <button onClick={props.callback}>Load data</button>
    </div>
  );
}

function ClearButton(props) {
  return (
    <div className="loadButton">
      <button onClick={props.callback}>Clear data</button>
    </div>
  );
}


const defaultData = [
  {time: "12:06:00", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0},
  {time: "12:07:00", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0}, {time: " ", dB:0},
  {time: "12:08:00", dB:72}, {time: " ", dB:68}, {time: " ", dB:90}, {time: " ", dB:86}, {time: " ", dB:74}, {time: " ", dB:85}, {time: " ", dB:74}, {time: " ", dB:89}, {time: " ", dB:78}, {time: " ", dB:62}, {time: " ", dB:60}, {time: " ", dB:65},
  {time: "12:09:00", dB:81}, {time: " ", dB:67}, {time: " ", dB:88}, {time: " ", dB:72}, {time: " ", dB:78}, {time: " ", dB:82}, {time: " ", dB:73}, {time: " ", dB:85}, {time: " ", dB:72}, {time: " ", dB:90}, {time: " ", dB:75}, {time: " ", dB:81},
  {time: "12:10:00", dB:62}, {time: " ", dB:60}, {time: " ", dB:70}, {time: " ", dB:73}, {time: " ", dB:82}, {time: " ", dB:84}, {time: " ", dB:62}, {time: " ", dB:61}, {time: " ", dB:79}, {time: " ", dB:88}, {time: " ", dB:90}, {time: " ", dB:78}
  ];
  
  export default App;
