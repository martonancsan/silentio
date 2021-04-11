// https://codeforgeek.com/handle-get-post-request-express-4/
// const controller = require("controller");
const express = require("express");
const router = express.Router();
const app = express();
const { processUnitData, listUnitData } = require("../controller");
const moduleName = "ROUTER"

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// TODO list API calls to be implemented with brief description


// GET method route
app.get('/measurementData', async function (req, res) {
  measurementData = await listUnitData()
  // measurementData = ["6madgnC1rU9GsLJfKxiz","86JXPOp0l8FFSDYwRDys","Djhe2H160aRnzc7ji9wf","EXoxXWrwOhV1y9YuO4Y8","WON12PyCNiIEvGFJRCLJ",
  // "lDAg51kN43vaLVE7I3kV","uCEGpkP16SiEPR6Yw9bf","uMyj2gV8tmwjBBRsJWdY"];
  // // res.send(`measurement data: ${measurementData}`)
  // console.log(`dummy data sent, first element: ${measurementData[0]}`)
  res.send(measurementData)
})

// GET method route
app.get('/measurementIds', async function (req, res) {
  measurementData = await listUnitData()
  // measurementData = ["6madgnC1rU9GsLJfKxiz","86JXPOp0l8FFSDYwRDys","Djhe2H160aRnzc7ji9wf","EXoxXWrwOhV1y9YuO4Y8","WON12PyCNiIEvGFJRCLJ",
  // "lDAg51kN43vaLVE7I3kV","uCEGpkP16SiEPR6Yw9bf","uMyj2gV8tmwjBBRsJWdY"];
  // // res.send(`measurement data: ${measurementData}`)
  // console.log(`dummy data sent, first element: ${measurementData[0]}`)
  res.send(measurementData)
})


// POST method route
app.post('/data', function (req, res) {
  // process received unit Data
  console.log(`${moduleName}: post request received`);
  if (processUnitData(req.body)) {
    // send back HTTP status that everyting was fine
    // let status = 200; 
    // res.sendStatus(status);
    console.log(`${moduleName}: post response sent\n`);
    res.send(`SERVER: Unit measurement data processed\n`);
  } else { 
    // TODO: add error handling and other status codes
    // TODO: server status codes: https://expressjs.com/en/4x/api.html#res.sendStatus
    // let status = 200; 
    // res.sendStatus(status);
  }
});

app.listen(3001, () => {
  console.log("Started on PORT 3001");
})