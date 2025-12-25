const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();  // This looks for .env file

const app = express();
app.use(cors());
app.use(express.json());//allows the server to read the email and password send

// Database connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Test the connection
db.getConnection((err) => {
  if (err) {
    console.error("Connection failed: ", err);
  } else {
    console.log("Success, Connected to the Hallal Snacks database.");
  }
});

// The "Get Products" Window
app.get('/api/products', (req, res) => {
    const sqlSearch = "SELECT * FROM products";
    db.query(sqlSearch, (err, result) => {
        if (err) {
            console.log("Error searching database:", err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});