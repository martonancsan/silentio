// controller.js: contains code that processes data from API calls
// calls model.js if databased is needed to be accessed
// import model from moduel 
// model.js: contains code that
// import {saveUnitData} from './model';
const { response } = require('express');
const { UpdateBuilder } = require('firebase-functions/lib/providers/remoteConfig');
const { getUnitData, getCurrentLimit, getTargetFirmwareVersion } = require('../model')

const moduleName = "CONTROLLER";


// lists a unit's all measurement data 
async function getDisplayData(unitInfo) {
    console.log(`${moduleName}: getUnitData called`);
    let unitData = await getUnitData(unitInfo);
    console.log(`${moduleName}: getUnitData returns: ${unitData}`);

    var displayData = createDisplayData(unitData);

    return displayData;
    // TODO: we have to handle if the requested data range is longer than what can be returned
    // TODO: have to handle if unit is not found or no data is found for it
    // TODO: have to handle if unit data is not enough to show
}



// transform a unit's data to make it displayable with Rechart 
function createDisplayData(unitData) {
    var transformedData = [];
    // iterate through all dataframes by minute long dataframes
    for (var i = 0; i < unitData.length; i++) {
        var minuteData = unitData[i];
        var timeStamp = minuteData["time"];
        var levels = minuteData.soundLevels;

        // a time value is displayed with every minute 
        // dataframe with first dB level value, the ot
        transformedData.push({ time: timeStamp, dB: levels[0] });
        for (var j = 1; j < levels.length; j++) {
            transformedData.push({ time: "", dB: levels[j] })
        }
        // for (var key in minuteData) {
        //     var value = minuteData[key];
        //     console.log(`key: ${key}, value: ${value}`);
        // }
    }
    console.log(`transformedData: ${JSON.stringify(transformedData)}`);

    return transformedData;
    // TODO: we have to handle if the requested data range is longer than what can be returned
    // TODO: have to handle if unit is not found or no data is found for it
    // TODO: have to handle if unit data is not enough to show
}


// calculates average of measurements (12 measurements of 5 sec intervals = 1 minute)
function avgerageData(measurementData) {
    let sum = 0;
    let avg = 0;
    let i = 0;

    for (i = 0; i < 12; i++) {
        sum += measurementData[i];
    }

    avg = sum / 12;

    return avg;
}

// checks is average of measurements is larget than limit
async function isLimitCrossed(unitInfo) {

    let avg = 0;
    var limit = await getCurrentLimit(unitInfo);
    console.log(`${moduleName}: isLimitCrossed called`);
    console.log(`${moduleName}: limit: ${ limit}`);

    avg = avgerageData(unitInfo.soundLevels);
    if (avg > limit) {
        console.log(`${moduleName}: limit: ${limit} < average: ${avg}, limit crossed`);
        console.log(`${moduleName}: isLimitCrossed returning TRUE`);
        return true;
    }
    else {
        console.log(`${moduleName}: limit: ${limit} > average: ${avg}, limit not crossed`);
        console.log(`${moduleName}: isLimitCrossed returning FALSE`);
        return false;
    }
}

async function firmwareNeedsUpdate(unitInfo) {
    let currentVersion = unitInfo.fw;
    let targetVersion = await getTargetFirmwareVersion(unitInfo);

    if (targetVersion != currentVersion) {
        console.log(`currentVersion: ${currentVersion} DOES NOT EQUAL targetVersion: ${targetVersion}`);
        // firmware needs upgrade
        return true;
    }
    else {
        console.log(`currentVersion: ${currentVersion} EQUALS targetVersion: ${targetVersion}`);
        // firmware does not need upgrade
        return false;
    }
}

module.exports = { getDisplayData, isLimitCrossed, firmwareNeedsUpdate }