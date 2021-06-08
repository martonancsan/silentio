const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const moduleName = "MODEL";

// saves unit data to db
async function saveUnitData(unitData) {
    console.log(`${moduleName}: saveUnitData called`);

    var { userId, unitId, soundLevels } = unitData;
    console.log(`${moduleName}: userId: ${userId}`);
    console.log(`${moduleName}: unitId: ${unitId}`);
    console.log(`${moduleName}: levels: ${JSON.stringify(soundLevels)}`);

    // TODO: implement like this: get collection (users / { userid } / units / { unitid } / days / { date } / hours / { hour } / minutes / )
    // get collection of measurement for user and unit
    const currentTime = Date.now();
    

    console.log(`${moduleName}: currentTime in ms since 1970.01.01: ${currentTime}`);

    db.collection('users').doc(userId)
        .collection('units').doc(unitId).collection('data').doc(`${currentTime}`).set({
            time : currentTime,
            levels: soundLevels
        })

    // Add a new document with a generated id.
    // const res = await collection.add({
    // });

    // console.log(`${moduleName}: Added document with ID: `, res.id);
    console.log(`${moduleName}: Measured data saved`);
    return true;
}



// gets a unit's all measurement data from db
async function getUnitData(unitInfo) {
    console.log(`${moduleName}: getUnitData called`);

    var { userId, unitId } = unitInfo;
    console.log(`${moduleName}: user ID: ${userId}, unit ID: ${unitId}`);

    // /users/pXPhnkTqOwMJROLIniIU/units/hjGmVlgJNpg3lgwpWP10/data/Yk869FEs3Sly1vLifa3z
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

// // gets a unit's all measurement data from db
// async function getUnitData() {
//     console.log(`${moduleName}: getUnitData called`);

//     // var { userId, unitId, date, hour, minute, measurement } = unitInfo;

//     const measurementCollection = db.collection('users').doc('SfUF6EuUu9xQBFrG0Rxc')
//         .collection('units').doc('749112039873').collection('measurements')

//     var unitData = [];

//     // const citiesRef = db.collection('cities');
//     // const snapshot = await citiesRef.get();
//     // snapshot.forEach(doc => {
//     //     console.log(doc.id, '=>', doc.data());
//     // });

//     const snapshot = await measurementCollection.get()
//     snapshot.forEach(doc => {
//         // console.log(doc.id, '=>', doc.data());
//         let measurementId = doc.id;
//         let measurementData = doc.data();
//         // let measurement.measurementId = measurementData ;
//         unitData.push(measurementId);
//         // console.log(`${moduleName}: Unit data: ${JSON.stringify(unitData)}`);
//     });

//     // console.log(`${moduleName}: Unit data returned`);
//     console.log(`${moduleName}: Unit data returned: ${JSON.stringify(unitData)}`);
//     return unitData;
// }

// TODO import firebase firestore or realtime DB, or both
// whichever we want to use

// gets data from db that is typically shown to users
// lenght: TBD, most probably last 24 hours or 12 hours
// there shouldnt be two functions, default parameters should handle 
async function getDefaultData(unitInfo) {
    // TODO integrate into getDataBetween, but with default parameters

}

// TODO: make a decision how we would proceed with showing measurement data
// NOTE: at first we should query fixed intervals
// NOTE: the UI should be able to modify data
// get data in a certain time interval
// user can ask for time between two timepoints, delimited by two timestamps
async function getDataBetween(unitInfo, timeInterval) {
    // deconstruct timeInterval
    var { start, finish } = timeInterval;
    // deconstruct unitInfo

    // query unit info between start and finish date
    // note: if can not be filtered upon query / not optimal 
    // then we should query a larger block and filter data out
}


// returns unit information from db 
async function getUnitInfo(unitIdentification) {
    // deconstruct unitIdentification
    let { unitId, userId } = unitIdentification;
    // get db reference
    dbref = reference('/users/{userId}/units/{unitId}/')
    // get unit info from database
    unitInfo = dbRef.get()
    return unitInfo;
}

// creates a unit document in 
async function createUnitId(userInfo, unitInfo) {
    // deconstruct unitInfo
    let { userId, ...stuff } = userInfo;
    // get reference to units collection
    collectionRef = db.ref('/users/{userId}/units/');
    // create document for unit in collection
    unitId = collectionRef.add(unitInfo);
    return unitId;
}

async function setUnitLocation(unitInfo) {
    // deconstruct unitInfo
    let { userId, unitId, location } = unitInfo;
    // get db ref
    documentRef = db.ref('/users/{userId}/units{unitId}/');
    // set unit location in db
    let result = documentRef.set("location", location);
    return result;
}

module.exports = { saveUnitData, getUnitData }