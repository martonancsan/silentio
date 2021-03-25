// controller.js: contains code that processes data from API calls
// calls model.js if databased is needed to be accessed
// import model from moduel 
// model.js: contains code that
// import {saveUnitData} from './model';
const { response } = require('express');
const { saveUnitData } = require('../model')

const moduleName = "CONTROLLER";

// lists a units measurement data from a certain time period
// used by the chart on the opening screen
// this is the data that the user sees 
async function listUnitData(unitInfo, timeInterval) {
    // default case, when user sees data for the first time
    if (timeInterval_is_not_defined) {
        // set time interval to default values, last n hours of data
        let finish = Date.now();
        // TODO HOUR_INTERVAL to be defined in environment variable
        let start = Date.now() - 12 * HOUR_INTERVAL;
        timeInterval = { start, finish };
        let unitData = getUnitData(unitInfo, timeInterval);
    } else {
        let unitData = getUnitData(unitInfo, timeInterval);
    }
    return unitData;
    // TODO: we have to handle if the requested data range is longer than what can be returned
    // TODO: have to handle if unit is not found or no data is found for it
    // TODO: have to handle if unit data is not enough to show
}



// select a different unit that the owner has
// used when the user wants to load a new units data
function selectUnit(unitIdentification) {
    // get new unit info
    unitInfo = getUnitInfo(unitIdentification)
    // set it to be active unit, update the chache with the new info
    updateCache(unitInfo)
    // list default data with default time interval
    listUnitData(unitInfo)
}

// we maintain a cache for the user and unit information 
// always one unit is set to be the active unit on the screen
// we can see the data for the active unit 
function updateCache(unitInfo) {
    // deconstruct unitInfo
    let { unitId, location, unitStatus } = unitInfo;
    // cache unit info into some sort of environtment variable 
    // TODO: find out how people usually cache data and manage state in firebase
    myCache.set('current unit ID') = unitId;
    myCache.set('current unit ID') = location;
    myCache.set('current unit location') = unitStatus;
}

// get unit info from google maps
function getLocation() {
    mapsObject = setGoogleMaps("URL");
    location = mapsObject.getPosition();
    return location;
}
// get unit id from cache
function getUnitId() {
    let unitId = myCache.get('unitId');
    return unitId;
}

function getUserId() {
    let userId = myCache.get('userId');
    return userId;
}

// set a new location for the unit
// TODO: how people handle location data in google maps 
// how they update location in database using google maps
function updateUnitLocation() {
    // get location from google maps
    // TODO: handle if location is not set yet
    let location = getLocation();
    let unitId = getUnitId();
    let userId = getUserId();
    let unitInfo = { userId, unitId, location }
    // call setter in model
    let result = setUnitLocation(unitInfo);
    return result;
}


// register unit when a unit connects webapp 
// the first time it is registered
async function registerUnit(unitInfo) {
    userInfo = getUserInfo();

    // create unit id and store unit info
    unitId = createUnitId(userInfo, unitInfo);

    // return unit it and send token for identification 
    createToken(unitId);
    sendUnitToken();
}

// webapp requests status info from unit
// NOTE: this might not be needed, might not be worth to plan it 
async function requestUnitStatus(unitId) {
    // webapp gets (cached) unit info based on unit id 
    unitInfo = getUnitInfo(unitId);
    // webapp creates http request based on unitInfo to check unit status
    let request = createRequest(unitInfo);
    // webapp sends http request
    // webapp waits for http response from unit and parses unit data
    let result = sendRequest(request);
    return result;
}

// unit kéri, hogy frissítsük az adatait 
// unit requests webapp to update unit info
async function unitUpdateStatusRequest(unitInfo) {
    // parse unit info
    let { unitId, unitIP, location } = unitInfo;
    // compare unit info to cache and database
    let currentUnitId = myCache.get('current unit ID');
    let currentUnitIP = myCache.get('current unit IP');
    let currentUnitLocation = myCache.get('current unit location');
    // if unit info is new, save data
    if (unitId != myCache.get('current unit ID')) {
        myCache.get('current unit ID') = unitId;
        response.add("current unit ID refreshed");
    }
    if (unitIP != myCache.get('current unit IP')) {
        myCache.get('current unit IP') = unitIP;
        response.add("current unit IP refreshed");

    }
    if (unitIP != myCache.get('current unit location')) {
        myCache.get('current unit location') = unitIP;
        response.add("current unit location refreshed");
    }
    // respond to unit which data was received and saved
    return response;
}

// unit sends one minute of measurement data
async function sendData(unitInfo, unitData) {
    // unit is authenticated based on token
    let { unitToken, unitId } = unitInfo;
    if (valid(unitToken)) {
        // unit data is saved to database
        saveUnitData(unitInfo);
        // response back to unit that data was saved 
        sendResponse(unit)
    } else {
        // token was invalid
        sendResponse("invalid token, unit not identified");
    }
}

// unit meghibásodát jelez
// unit sends error message to webapp
async function unitError(unitInfo, errorInfo) {
    let { unitToken, unitId, unitStatus, userId } = unitInfo;
    // unit is authenticated based on token 
    if (valid(unitToken)) {
        // unit error info is saved
        saveErrorInfo(errorInfo);
        // unit status updated
        updateUnitStatus(unitStatus)
        // user is notified of unit error
        notifyUser(userId);
        // response back to unit that error info is saved
        sendResponse("user notified, error info saved");
    } else {
        // token was invalid
        sendResponse("invalid token, unit not identified");
    }
}


// webapp checks all units every 5 minutes
// when unit goes offline and doesn't send data for 5 minutes 
// then webapp registers it offline
// runs every five minutes
async function checkUnit() {
    // the job checks if all units were updated in the last two minutes
    unitList = getUnitList();
    for (unit in unitList) {
        // if a unit was not updated in last 5 minutes, webapp checks unit status
        if (unit.lastUpdate() < Date.now() - 5 * MINUTES) {
            // if unit can not be contacted, unit will be registered offline
            updateUnitStatus("offline");
            let userInfo = getUserInfo(unit);
            let { user, userId } = userInfo;
            user.notifyUser(`your ${unitInfo} went offline`);
        }
    }
}




// slices data to pieces 
// creates database object 
function processUnitData(unitData) {
    let { unitId, date, hour, minute, measurementData } = unitData;
    // var date = unitData.date;
    // var hour = unitData.hour;
    // var minute = unitData.minute;
    // var measurementData = unitData.measurement;
    let measurementString = JSON.stringify(unitData.measurement);

    console.log(`${moduleName}: Unit measurement recieved from unit ${unitId}`);
    console.log(`Measurement took place on ${date} at ${hour}:${minute}`);
    console.log(`Measured data: ${measurementString}`);

    // saves unit data to database
    // returns true if data saved false if not
    let unitDataSaved = saveUnitData(unitData);

    return unitDataSaved;
}

// might not be needed, because 
// converts measurement data 
// from JSON to array
// example input {"5":74,"10":83,"15":61,"20":77,"25":88,"30":64,"35":82,"40":80,"45":84,"50":83,"55":69,"60":88}
// output [74,83,61,77,88,64,82,80,84,83,69,88]
async function convertMeasurementToArray(measurementData) {
    // var measurement = JSON.stringify(req.body.measurement)
    var convertedData = [measurementData[5], measurementData[10],
    measurementData[15], measurementData[20],
    measurementData[25], measurementData[30],
    measurementData[35], measurementData[40],
    measurementData[45], measurementData[50],
    measurementData[55], measurementDatat[60]];

    console.log(`Input data: ${measurement}`);
    console.log(`Output data: 
    ${convertedData[0]},${convertedData[1]},${convertedData[2]},${convertedData[3]},
    ${convertedData[4]},${convertedData[5]}${convertedData[6]},${convertedData[7]},
    ${convertedData[8]},${convertedData[9]},${convertedData[10]},${convertedData[11]}`);

    return convertedData;
}

// NOTE: LEAST PRIORITY. implement this if really necessary, can be the last function to be implemented
// smooths data based on averaging 
// creates a moving average based on a fix time interval 
// user adds how big is the time interval
async function averaging(data, timeInterval) {
    // decide size of data interval to be averaged (x) based on time interval
    // loop through data array, add every x data points and divide them by x 
    // return averaged results
}

// NOTE: low priority, might not be needed
// user restarted unit, unit sends message about it to webapp
async function unitRestartRequested(unitInfo) {
    // unit restart info parsed 
    // unit restart info saved 
    // response to unit that restart was noted
}

// set it to be active unit, update the chache with the new info
// TODO: cache update should either be generic set(key, value)
// TODO: or it might not be needed at all
function updateCache(unitInfo) {

}

// TODO data
// not prio
// - when most things are done create some sort of cache to reduce database operations (not prio)


module.exports = { processUnitData }