// TODO: connect app here with firebase 
// https://firebase.google.com/docs/firestore/quickstart#node.js_1
// BE CAREFUL not to include service api key
// use it as environment variable (export SERVIC_KEY) 
// like it was said in 100 tips for firebase video

const admin = require('firebase-admin');
// TODO: ezt nem kellene titkosítani?
const serviceAccount = require('/home/marton/Downloads/service-account-file.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const moduleName = "MODEL";

// hardcoded data for testing
const hardcodedData = [
    { time: 0, dB: 81, dBavg: 81
    },
    { time: 5, dB: 83, dBavg: 82
    },
    { time: 10, dB: 78, dBavg: 80.7
    },
    { time: 15, dB: 84, dBavg: 81.5
    },
    { time: 20, dB: 71, dBavg: 79.4
    },
    { time: 25, dB: 87, dBavg: 80.6
    },
    { time: 30, dB: 66, dBavg: 77.2
    },
    { time: 35, dB: 75, dBavg: 76.6
    },
    { time: 40, dB: 84, dBavg: 76.6
    },
    { time: 45, dB: 83, dBavg: 79
    },
    { time: 50, dB: 79, dBavg: 77.4
    },
    { time: 55, dB: 76, dBavg: 79.4
    },
    { time: 60, dB: 78, dBavg: 80
    },
    { time: 65, dB: 77, dBavg: 78.6
    },
    { time: 70, dB: 74, dBavg: 76.8
    },
    { time: 75, dB: 68, dBavg: 74.6
    },
    { time: 80, dB: 78, dBavg: 75
    },
    { time: 85, dB: 70, dBavg: 73.4
    },
    { time: 90, dB: 65, dBavg: 71
    },
    { time: 95, dB: 65, dBavg: 69.2
    },
    { time: 100, dB: 81, dBavg: 71.8
    },
    { time: 105, dB: 90, dBavg: 74.2
    },
    { time: 110, dB: 87, dBavg: 77.6
    },
    { time: 115, dB: 66, dBavg: 77.8
    },
    { time: 120, dB: 71, dBavg: 79
    },
    { time: 125, dB: 66, dBavg: 76
    },
    { time: 130, dB: 85, dBavg: 75
    },
    { time: 135, dB: 76, dBavg: 72.8
    },
    { time: 140, dB: 85, dBavg: 76.6
    },
    { time: 145, dB: 70, dBavg: 76.4
    },
    { time: 150, dB: 73, dBavg: 77.8
    },
    { time: 155, dB: 75, dBavg: 75.8
    },
    { time: 160, dB: 74, dBavg: 75.4
    },
    { time: 165, dB: 66, dBavg: 71.6
    },
    { time: 170, dB: 80, dBavg: 73.6
    },
    { time: 175, dB: 85, dBavg: 76
    },
    { time: 180, dB: 82, dBavg: 77.4
    },
    { time: 185, dB: 80, dBavg: 78.6
    },
    { time: 190, dB: 68, dBavg: 79
    },
    { time: 195, dB: 66, dBavg: 76.2
    },
    { time: 200, dB: 77, dBavg: 74.6
    },
    { time: 205, dB: 73, dBavg: 72.8
    },
    { time: 210, dB: 87, dBavg: 74.2
    },
    { time: 215, dB: 72, dBavg: 75
    },
    { time: 220, dB: 74, dBavg: 76.6
    },
    { time: 225, dB: 81, dBavg: 77.4
    },
    { time: 230, dB: 81, dBavg: 79
    },
    { time: 235, dB: 76, dBavg: 76.8
    }
  ];


// saves unit data to db
async function saveUnitData(unitData) {
    console.log(`${moduleName}: saveUnitData called`);

    var { userId, unitId, date, hour, minute, measurement } = unitData;

    // TODO: implement like this: get collection (users / { userid } / units / { unitid } / days / { date } / hours / { hour } / minutes / )
    // get collection of measurement for user and unit
    const collection = db.collection('users').doc('SfUF6EuUu9xQBFrG0Rxc')
        .collection('units').doc('749112039873').collection('measurements')

    // Add a new document with a generated id.
    const res = await collection.add({
        "date": date,
        "hour": hour,
        "minute": minute,
        "data": measurement
    });

    console.log(`${moduleName}: Added document with ID: `, res.id);
    console.log(`${moduleName}: Measured data saved`);
    return true;
}



// gets a unit's all measurement data from db
async function getUnitData() {
    console.log(`${moduleName}: getUnitData called`);

    // var { userId, unitId, date, hour, minute, measurement } = unitInfo;

    // const measurementCollection = db.collection('users').doc('SfUF6EuUu9xQBFrG0Rxc')
    //     .collection('units').doc('749112039873').collection('measurements')

    var unitData = hardcodedData;

    // const citiesRef = db.collection('cities');
    // const snapshot = await citiesRef.get();
    // snapshot.forEach(doc => {
    //     console.log(doc.id, '=>', doc.data());
    // });

    // const snapshot = await measurementCollection.get()
    // snapshot.forEach(doc => {
    //     // console.log(doc.id, '=>', doc.data());
    //     let measurementId = doc.id;
    //     let measurementData = doc.data();
    //     // let measurement.measurementId = measurementData ;
    //     unitData.push(measurementId);
    //     // console.log(`${moduleName}: Unit data: ${JSON.stringify(unitData)}`);
    // });

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