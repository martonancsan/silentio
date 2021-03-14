# curl -d '{ "unitId": 749112039873, "measurement": { "5": 74, "10": 83, "15": 61, "20": 77, "25": 88, "30": 64, "35": 82, "40": 80, "45": 84, "50": 83, "55": 69, "60": 88 } }' -H "Content-Type: application/json" -X POST http://localhost:3000/data

curl -d "@data.json" -H "Content-Type: application/json" -X POST http://localhost:5000/data

