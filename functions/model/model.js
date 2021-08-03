const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const moduleName = "MODEL";

// saves unit data to db
async function saveUnitData(unitData) {
    // console.log(`${moduleName}: saveUnitData called`);

    var { userId, unitId, soundLevels } = unitData;
    // console.log(`${moduleName}: userId: ${userId}`);
    // console.log(`${moduleName}: unitId: ${unitId}`);
    // console.log(`${moduleName}: levels: ${JSON.stringify(soundLevels)}`);

    // TODO: implement like this: get collection (users / { userid } / units / { unitid } / days / { date } / hours / { hour } / minutes / )
    // get collection of measurement for user and unit
    const currentTime = Date.now();


    // console.log(`${moduleName}: currentTime in ms since 1970.01.01: ${currentTime}`);

    db.collection('users').doc(userId)
        .collection('units').doc(unitId).collection('data').doc(`${currentTime}`).set({
            time: currentTime,
            levels: soundLevels
        })

    // Add a new document with a generated id.
    // const res = await collection.add({
    // });

    // console.log(`${moduleName}: Added document with ID: `, res.id);
    // console.log(`${moduleName}: Measured data saved`);
    return true;
}

// saves unit data to db
async function setTargetFirmwareUrl(unitData) {
    // console.log(`${moduleName}: setFirmwareURL called`);

    var { userId, unitId, url } = unitData;
    // console.log(`${moduleName}: userId: ${userId}`);
    // console.log(`${moduleName}: unitId: ${unitId}`);
    // console.log(`${moduleName}: URL: ${url}`);


    db.collection('users').doc(userId)
        .collection('units').doc(unitId).set({
            targetFirmwareUrl: url
        }, { merge: true })

    return true;
}

async function setTargetFirmwareVersion(unitData) {
    // console.log(`${moduleName}: setFirmwareURL called`);

    var { userId, unitId, firmwareVersion } = unitData;
    // console.log(`${moduleName}: userId: ${userId}`);
    // console.log(`${moduleName}: unitId: ${unitId}`);
    // console.log(`${moduleName}: URL: ${url}`);


    db.collection('users').doc(userId)
        .collection('units').doc(unitId).set({
            targetFirmwareVersion: firmwareVersion
        }, { merge: true })

    return true;
}

async function setLimit(unitData) {

}



// gets a unit's all measurement data from db
async function getUnitData(unitInfo) {
    console.log(`${moduleName}: getUnitData called`);

    var { userId, unitId } = unitInfo;
    console.log(`${moduleName}: user ID: ${userId}, unit ID: ${unitId}`);

    const dataCollection = db.collection('users').doc(userId)
        .collection('units').doc(unitId).collection('data');

    var unitData = [];

    const snapshot = await dataCollection.get();
    console.log(`${moduleName}: snapshot contains ${snapshot.size} documents`);

    var row = 0;
    snapshot.forEach(doc => {
        var measurementData = doc.data();
        row++;
        console.log(`${moduleName}: snapshot foreach ${row}: ${measurementData}`);
        unitData.push(measurementData);
    });

    // console.log(`${moduleName}: Unit data returned`);
    console.log(`${moduleName}: Unit data returned: ${JSON.stringify(unitData)}`);
    return unitData;
}

async function getCurrentLimit(unitInfo) {
    console.log(`${moduleName}: getCurrentLimit called`);
    var { userId, unitId } = unitInfo;
    console.log(`${moduleName}: user ID: ${userId}, unit ID: ${unitId}`);

    const docRef = db.collection('users').doc(userId)
        .collection('units').doc(unitId);

    const doc = await docRef.get();
    if (!doc.exists) {
        console.log(`No limit data found for User ID: ${userId} unitId: ${unitId}`);
        return -1;
    } else {
        var limitValue = doc.get('limit');
        console.log(`typeof limitValue:${typeof limitValue}`)
        console.log("limitValue:", limitValue);
        return limitValue;
    }

}

async function getTargetFirmwareUrl(unitInfo) {
    console.log(`${moduleName}: getFirmwareURL called`);

    var { userId, unitId } = unitInfo;

    const docRef = db.collection('users').doc(userId)
        .collection('units').doc(unitId);

    const doc = await docRef.get();
    if (!doc.exists) {
        console.log(`Unit with ID ${unitId} not found`);
        return "empty";
    } else {
        var targetFirmwareUrl = doc.get('targetFirmwareUrl');
        console.log(`typeof targetFirmwareUrl:${typeof targetFirmwareUrl}`)
        console.log("targetFirmwareUrk:", targetFirmwareUrl);
        return targetFirmwareUrl;
    }
}

async function getTargetFirmwareVersion(unitInfo) {
    var { userId, unitId } = unitInfo;

    const docRef = db.collection('users').doc(userId)
        .collection('units').doc(unitId);

    const doc = await docRef.get();
    if (!doc.exists) {
        console.log(`Unit with ID ${unitId} not found`);
        return "empty";
    } else {
        var targetFirmwareVersion = doc.get('targetFirmwareVersion');
        // console.log(`typeof targetFirmwareVersion:${typeof targetFirmwareVersion}`)
        // console.log("targetFirmwareVersion:", targetFirmwareVersion);
        return targetFirmwareVersion;
    }
}

module.exports = {
    saveUnitData, getUnitData, getCurrentLimit,
    getTargetFirmwareUrl, getTargetFirmwareVersion, setTargetFirmwareUrl, setTargetFirmwareVersion
}