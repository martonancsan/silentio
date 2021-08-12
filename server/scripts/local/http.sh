#        curl -d "@data3.json" -H "Content-Type: application/json" -X POST https://us-central1-database-project-7369c.cloudfunctions.net/router/saveUnitData

for i in {1..10}; do
    echo -n "CLIENT : Data frame $i sent at "
    date
    curl -d "@data.json" -H "Content-Type: application/json" -X POST http://localhost:5001/database-project-7369c/us-central1/router/saveUnitData
    sleep 0.5s
done
