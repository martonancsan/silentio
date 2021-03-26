const admin = require('firebase-admin');

const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const moduleName = "MODEL";


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
    var {start, finish} = timeInterval;
    // deconstruct unitInfo

    // query unit info between start and finish date
    // note: if can not be filtered upon query / not optimal 
    // then we should query a larger block and filter data out
}



// saves unit data to db
async function saveUnitData(unitData) {
    var { userId, unitId, date, hour, minute, measurementData } = unitData;
    console.log(`${moduleName}: saveUnitData called`);
    // get dBreference
    dbref = firestore.get(users / { userid } / units / { unitid } / days / { date } / hours / { hour } / minutes / { minute })
    // add measurement data to DB
    // dbref.add(measurementData)
    console.log(`${moduleName}: Measured data saved`);
    return true;
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

module.exports = { saveUnitData }