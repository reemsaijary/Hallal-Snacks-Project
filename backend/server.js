const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

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
    console.log("Success! Connected to the Hallal Snacks database.");
  }
});

// ---  LOGIN ROUTE ---
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sqlSearch = "SELECT * FROM users WHERE email = ? AND password = ?";
    
    db.query(sqlSearch, [email, password], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length > 0) {
            // Sends the whole user object including the role back to React
            res.send({ message: "Welcome back!", user: result[0] });
        } else {
            res.status(401).send({ message: "Wrong credentials!" });
        }
    });
});

// --- SIGN UP ROUTE ---
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    const defaultRole = 'user'; 
    // Check if user exists first
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) return res.status(500).send(err);
        
        if (result.length > 0) {
            return res.status(400).send({ message: "Email already exists!" });
        } else {
            const sqlInsert = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
            
            db.query(sqlInsert, [email, password, defaultRole], (err, result) => {
                if (err) {
                    console.error("Insert error:", err);
                    return res.status(500).send(err);
                }
                console.log(`Success! New account: ${email} with role: ${defaultRole}`);
                res.send({ message: "Account created! You are now a member." });
            });
        }
    });
});

// --- GET PRODUCTS ---
app.get('/api/products', (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});