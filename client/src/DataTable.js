import React from "react";

export default function DataTable(props) {
  const { measurementIds } = props;

  const idRows = measurementIds.map((measurementId, idx) => (
    <tr key={idx} >
      <td>{measurementId}</td>
    </tr>
  ));

  return (
    <table className="data table">
      <thead>
        <tr>
          <th colSpan="5">
            <h3>Measurement IDs</h3>
          </th>
        </tr>
        {/* <tr>
          <th className="eight wide">Description</th>
        </tr> */}
      </thead>
      <tbody>
        {idRows}
      </tbody>
      {/* <tfoot>
        <tr>
          <th>Total</th>
          <th className="right aligned" id="total-kcal">
            {sum(foods, "kcal")}
          </th>
          <th className="right aligned" id="total-protein_g">
            {sum(foods, "protein_g")}
          </th>
          <th className="right aligned" id="total-fat_g">
            {sum(foods, "fat_g")}
          </th>
          <th className="right aligned" id="total-carbohydrate_g">
            {sum(foods, "carbohydrate_g")}
          </th>
        </tr>
      </tfoot> */}
    </table>
  );
}

// function sum(foods, prop) {
//   return foods
//     .reduce((memo, food) => parseInt(food[prop], 10) + memo, 0.0)
//     .toFixed(2);
// }
