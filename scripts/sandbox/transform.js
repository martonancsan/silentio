var unitData = [
    {
        "time": "1112321321321",
        "soundLevels": [
            88,
            74,
            83,
            61,
            77,
            88,
            64,
            82,
            80,
            84,
            83,
            69
        ]
    },
    {
        "time": "1112321321322",
        "soundLevels": [
            88,
            74,
            83,
            61,
            77,
            88,
            64,
            82,
            80,
            84,
            83,
            69
        ]
    },
    {
        "time": "1112321321323",
        "soundLevels": [
            88,
            74,
            83,
            61,
            77,
            88,
            64,
            82,
            80,
            84,
            83,
            69
        ]
    },
    {
        "time": "1112321321324",
        "soundLevels": [
            88,
            74,
            83,
            61,
            77,
            88,
            64,
            82,
            80,
            84,
            83,
            69
        ]
    },
    {
        "time": "1112321321325",
        "soundLevels": [
            88,
            74,
            83,
            61,
            77,
            88,
            64,
            82,
            80,
            84,
            83,
            69
        ]
    }
];

var transformedData = [];
console.log(`unitData: ${JSON.stringify(unitData)}`);
// iterate through all dataframes by minute long dataframes
for (var i = 0; i < unitData.length; i++) {
    var minuteData = unitData[i];
    var timeStamp = minuteData["time"];
    var levels = minuteData.soundLevels;
    // a time value is displayed with every minute dataframe
    transformedData.push({time:timeStamp, dB:levels[0]});
    for (var j = 1; j < levels.length; j++){
        transformedData.push({time:"", dB:levels[j]})
    } 
    // for (var key in minuteData) {
    //     var value = minuteData[key];
    //     console.log(`key: ${key}, value: ${value}`);
    // }
}
console.log(`transformedData: ${JSON.stringify(transformedData)}`);

// console.log(`2. unitData: ${unitData}`);


// function transform(minuteData, index) {
//     time = minuteData.time;
//     db = minuteData.levels(0);
//     let jsonArray = [{ "time": time, "dB": dB }];
//     for (i = 1; i <= 6; i++) {
//         dB = minuteData.soundLevels[i];
//         jsonArray.append({ "time": "", "dB": dB })
//     }
// }

// var fruits = ["apple", "orange", "cherry"];
// fruits.forEach(myFunction);


// function transform(item, index) {
//     console.log(`item:${item}, index:${index}`)
// }

// function transformData(item, index) {
//     console.log(`item:${item}, index:${index}`)
// }
