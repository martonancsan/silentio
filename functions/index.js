const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
// admin.initializeApp();

const express = require("express");
const restAPI = express();
const { saveUnitData, getTargetFirmwareUrl, setTargetFirmwareUrl, setTargetFirmwareVersion } = require("./model");
const { getDisplayData, isLimitCrossed, firmwareNeedsUpdate } = require("./controller");
const { user } = require("firebase-functions/lib/providers/auth");
restAPI.use(express.urlencoded({ extended: false }));
restAPI.use(express.json());
const moduleName = "router";

// POST request: unit sends measurement data periodically
restAPI.post('/saveUnitdata', async function (req, res) {
    // save unit data to DB
    console.log(`${moduleName}: post request received`);
    let processingStatus = "KO";
    let recordingId = 0;
    if (saveUnitData(req.body)) {
        processingStatus = "OK";
        if (!isLimitCrossed(req.body)) {
            res.send(`Processing:${processingStatus},Playing:${recordingId}\n`);
        } else {
            recordingId = 1;
            res.send(`Processing:${processingStatus},Playing:${recordingId}\n`);
        }
        // console.log(`${moduleName}: post response sent\n`);
    } else {
        res.send(`Processing:${processingStatus},Playing:${recordingId}\n`);
    }
});

// POST request: unit sends measurement data periodically
restAPI.post('/getFirmwareUpdate', async function (req, res) {
    // save unit data to DB
    console.log(`${moduleName}: /getFirmwareUpdate - POST request received`);
    let processingStatus = "KO";
    let targetFirmwareUrl = "empty";
    if (await firmwareNeedsUpdate(req.body)) {
        processingStatus = "OK";
        targetFirmwareUrl = await getTargetFirmwareUrl(req.body);
        res.send(`Processing:${processingStatus},url:${targetFirmwareUrl}\n`);
        // console.log(`${moduleName}: post response sent\n`);
    } else {
        let processingStatus = "OK";
        res.send(`Processing:${processingStatus},url:${targetFirmwareUrl}\n`);
    }
});

restAPI.post('/setTargetFirmwareUrl', async function (req, res) {
    // save unit data to DB
    console.log(`${moduleName}: /setFirmwareUrl - POST request received`);
    let processingStatus = "KO";
    let url = "empty";
    if (setTargetFirmwareUrl(req.body)) {
        processingStatus = "OK";
        url = req.body.url;
        res.send(`Processing:${processingStatus},targetFirmwareURL set:${url}\n`);
    } else {
        res.send(`Processing:${processingStatus},targetFirmwareURL set:${url}\n`);
    }
});

restAPI.post('/setTargetFirmwareVersion', async function (req, res) {
    // save unit data to DB
    console.log(`${moduleName}: /setTargetFirmwareVersion - POST request received`);
    let processingStatus = "KO";
    let version = "none";
    if (setTargetFirmwareVersion(req.body)) {
        processingStatus = "OK";
        version = req.body.firmwareVersion;
        res.send(`Processing:${processingStatus},targetFirmwareVersion set:${version}\n`);
    } else {
        res.send(`Processing:${processingStatus},targetFirmwareVersion set:${version}\n`);
    }
});

// route GET request from unit
restAPI.get('/getDisplayData/user/:userId/unit/:unitId', async function (req, res) {
    console.log(`${moduleName}: getDisplayData called`);
    const unitInfo = {
        userId: req.params.userId,
        unitId: req.params.unitId
    }
    displayData = await getDisplayData(unitInfo)
    res.send(displayData)
});


/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ancsan.marton@gmail.com',
        pass: 'lrimrgzrhwpzfiwc'
    }
});


module.exports = {
    router: functions.https.onRequest(restAPI),
    sendMail: functions.https.onRequest((req, res) => {
        cors(req, res, () => {

            // getting dest email by query string
            const dest = req.query.dest;

            const mailOptions = {
                from: 'Silentio <ancsan.marton@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
                to: dest,
                subject: 'Hanglimit átlépés - 1027, Frankel Leó út 2-4.', // email subject
                html: `<p style="font-size: 16px;">A Frankel Leó út 2-4. szám alatti lakásban átlépte a hangerő az előre megadott limitet, 86 dB-t. 
                <br> Itt tud többet megtudni a mért adatokról: http://silentio.tech/username
                </p>` // email content in HTML
            };

            // returning result
            return transporter.sendMail(mailOptions, (erro, info) => {
                if (erro) {
                    return res.send(erro.toString());
                }
                return res.send('Sended');
            });
        });
    })
};