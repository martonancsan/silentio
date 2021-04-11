import React from "react";
import DataTable from "./DataTable";
// import Client from "./Client";
// const MATCHING_ITEM_LIMIT = 25;


function parseJSON(response) {
  return response.json();
}

function getData(cb) {
  return fetch(`measurementIds`, {
    accept: "application/json"
  })
    .then(parseJSON);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      measurementIdList: []
    };
    this.loadData = this.loadData.bind(this);
  }
 

  async loadData() {
    // fill measurementIdList data with Client.js data fetch

    let measurementIds = await getData();

    this.setState({
      measurementIdList: measurementIds})
  
  }

  render() {
    const { measurementIdList } = this.state;

    return (
      <div className="App">
        <div className="ui text container">
          <button onClick={this.loadData}>
            Get Data from Firebase
          </button>
          <DataTable
            measurementIds={measurementIdList}
          />
        </div>
      </div>
    );
  }
}

export default App;
