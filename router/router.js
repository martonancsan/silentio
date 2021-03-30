// https://codeforgeek.com/handle-get-post-request-express-4/
// const controller = require("controller");
const express = require("express");
const router = express.Router();
const app = express();
const { processUnitData, listUnitData } = require("../controller/controller.js");
const moduleName = "ROUTER"

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// TODO list API calls to be implemented with brief description


// GET method route
app.get('/', async function (req, res) {
  measurementData = await listUnitData()
  res.send(`measurement data: ${measurementData}`)
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

app.listen(3000, () => {
  console.log("Started on PORT 3000");
})