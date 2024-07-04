const express = require('express');
const axios = require('axios');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const path = require('path');

const databasePath = path.join(__dirname, 'mydb.db');

const app = express();

app.use(express.json());
app.use(cors());
let database = null;

// Database connection
const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    await createTable();

    app.listen(3005, () =>
      console.log('Server Running at http://localhost:3005/')
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

const createTable = async () => {
  try {
    await database.exec(`
      CREATE TABLE IF NOT EXISTS tickers (
        name TEXT,
        last TEXT,
        buy TEXT,
        sell TEXT,
        volume TEXT,
        base_unit TEXT
      )
    `);
  } catch (error) {
    console.log(`Table Creation Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

async function fetchData() {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = Object.values(response.data).slice(0, 10); // Get top 10 results

    // Clear existing data
    await database.run('DELETE FROM tickers');

    for (const ticker of tickers) {
      const { name, last, buy, sell, volume, base_unit } = ticker;
      await database.run(
        'INSERT INTO tickers (name, last, buy, sell, volume, base_unit) VALUES (?, ?, ?, ?, ?, ?)',
        [name, last, buy, sell, volume, base_unit]
      );
    }
    console.log('Data fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Fetch data and store it in the database
fetchData();

// Endpoint to get tickers data
app.get('/api/data', async (req, res) => {
  try {
    const tickers = await database.all('SELECT * FROM tickers');
    res.json(tickers);
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).send('Server error');
  }
});

module.exports = app;
