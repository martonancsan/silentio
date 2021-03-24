// https://codeforgeek.com/handle-get-post-request-express-4/
// const controller = require("controller");
const express = require("express");
const router = express.Router();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// TODO list API calls to be implemented with brief description


// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage\n')
})

// POST method route
app.post('/data', function (req, res) {
  // process received unit Data
  processUnitData(req.body);
  // send back HTTP status that everyting was fine
  // TODO check status codes
  let statusOK;
  res.status(statusOK);
  res.send('Unit measurement data processed\n');
  // todo: add error handling and other status codes
  // it could be something standard
  // there will be something standard solution
});

app.listen(3000, () => {
  console.log("Started on PORT 3000");
})