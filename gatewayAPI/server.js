
const express = require("express");
const router = express.Router();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage\n')
})

// POST method route
app.post('/data', function (req, res) {
  console.log("unitId: " +req.body.unitId)
  var measurement = JSON.stringify(req.body.measurement)
  console.log("measurement: " + measurement)
//   res.send('POST request received\n')
  res.send(measurement)

});

app.listen(3000,() => {
  console.log("Started on PORT 3000");
})