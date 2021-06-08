# curl -d '{ "unitId": 749112039873, "measurement": { "5": 74, "10": 83, "15": 61, "20": 77, "25": 88, "30": 64, "35": 82, "40": 80, "45": 84, "50": 83, "55": 69, "60": 88 } }' -H "Content-Type: application/json" -X POST http://localhost:3000/data

for i in {1..10}; do
    echo -n "CLIENT : Data frame $i sent at "
    date
    curl -d "@data.json" -H "Content-Type: application/json" -X POST https://us-central1-database-project-7369c.cloudfunctions.net/router/saveUnitData
    sleep 0.5s
done
