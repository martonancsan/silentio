const functions = require("firebase-functions");

const express = require("express");
const restAPI = express();
const { saveUnitData, getUnitData } = require("./model");
const { user } = require("firebase-functions/lib/providers/auth");
restAPI.use(express.urlencoded({ extended: false }));
restAPI.use(express.json());
const moduleName = "router";

// POST request: unit sends measurement data periodically
restAPI.post('/saveUnitdata', async function (req, res) {
    // save unit data to DB
    console.log(`${moduleName}: post request received`);
    if (saveUnitData(req.body)) {
        res.send(`SERVER: Unit measurement data processed\n`);
        console.log(`${moduleName}: post response sent\n`);
    } else {
        // TODO: add error handling and other status codes
        // TODO: server status codes: https://expressjs.com/en/4x/api.html#res.sendStatus
        // let status = 200; 
        // res.sendStatus(status);
    }
});

// route GET request from unit
restAPI.get('/getUnitData/user/:userId/unit/:unitId', async function (req, res) {
    const unitInfo = { 
        userId: req.params.userId,
        unitId: req.params.unitId 
    }
    measurementData = await getUnitData(unitInfo)
    res.send(measurementData)
});


module.exports = {
    router: functions.https.onRequest(restAPI)
};