const { processUnitData} = require('./controller') 

// TODO include data from file, don't hardcode
let unitData =
{
    "unitId": 749112039873,
    "date": "2021.03.19",
    "hour": "15",
    "minute": "02",
    "measurement": {
        "5": 74,
        "10": 83,
        "15": 61,
        "20": 77,
        "25": 88,
        "30": 64,
        "35": 82,
        "40": 80,
        "45": 84,
        "50": 83,
        "55": 69,
        "60": 88
    }
}

test('unit data is saved correctly', () => {
    expect(processUnitData(unitData)).toBe(true);
});

