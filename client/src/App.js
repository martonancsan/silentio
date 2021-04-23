import React from "react";
// import DataTable from "./DataTable";
import DataChart from "./DataChart";
// import Client from "./Client";
// const MATCHING_ITEM_LIMIT = 25;

export default App;

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
  { time: 0, dB: 0, dBavg: 0
  },
  { time: 5, dB: 0, dBavg: 0
  },
  { time: 10, dB: 0, dBavg: 0
  },
  { time: 15, dB: 0, dBavg: 0
  },
  { time: 20, dB: 0, dBavg: 0
  },
  { time: 25, dB: 0, dBavg: 0
  },
  { time: 30, dB: 0, dBavg: 0
  },
  { time: 35, dB: 0, dBavg: 0
  },
  { time: 40, dB: 0, dBavg: 0
  },
  { time: 45, dB: 0, dBavg: 0
  },
  { time: 50, dB: 0, dBavg: 0
  },
  { time: 55, dB: 0, dBavg: 0
  },
  { time: 60, dB: 0, dBavg: 0
  },
  { time: 65, dB: 0, dBavg: 0
  },
  { time: 70, dB: 0, dBavg: 0
  },
  { time: 75, dB: 0, dBavg: 0
  },
  { time: 80, dB: 0, dBavg: 0
  },
  { time: 85, dB: 0, dBavg: 0
  },
  { time: 90, dB: 0, dBavg: 0
  },
  { time: 95, dB: 0, dBavg: 0
  },
  { time: 100, dB: 0, dBavg: 0
  },
  { time: 105, dB: 0, dBavg: 0
  },
  { time: 110, dB: 0, dBavg: 0
  },
  { time: 115, dB: 0, dBavg: 0
  },
  { time: 120, dB: 0, dBavg: 0
  },
  { time: 125, dB: 0, dBavg: 0
  },
  { time: 130, dB: 0, dBavg: 0
  },
  { time: 135, dB: 0, dBavg: 0
  },
  { time: 140, dB: 0, dBavg: 0
  },
  { time: 145, dB: 0, dBavg: 0
  },
  { time: 150, dB: 0, dBavg: 0
  },
  { time: 155, dB: 0, dBavg: 0
  },
  { time: 160, dB: 0, dBavg: 0
  },
  { time: 165, dB: 0, dBavg: 0
  },
  { time: 170, dB: 0, dBavg: 0
  },
  { time: 175, dB: 0, dBavg: 0
  },
  { time: 180, dB: 0, dBavg: 0
  },
  { time: 185, dB: 0, dBavg: 0
  },
  { time: 190, dB: 0, dBavg: 0
  },
  { time: 195, dB: 0, dBavg: 0
  },
  { time: 200, dB: 0, dBavg: 0
  },
  { time: 205, dB: 0, dBavg: 0
  },
  { time: 210, dB: 0, dBavg: 0
  },
  { time: 215, dB: 0, dBavg: 0
  },
  { time: 220, dB: 0, dBavg: 0
  },
  { time: 225, dB: 0, dBavg: 0
  },
  { time: 230, dB: 0, dBavg: 0
  },
  { time: 235, dB: 0, dBavg: 0
  }
]