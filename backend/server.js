const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true // This allows the analytics q1; q2; q3 to work
});

db.getConnection((err) => {
  if (err) console.error("Connection failed: ", err);
  else console.log("Success! Connected to the Hallal Snacks database.");
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length > 0) res.send({ message: "Welcome back!", user: result[0] });
        else res.status(401).send({ message: "Wrong credentials!" });
    });
});

app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    db.query("INSERT INTO users (email, password, role) VALUES (?, ?, 'user')", [email, password], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Account created!" });
    });
});

app.get('/api/products', (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.post('/api/orders', (req, res) => {
    const { email, items, total } = req.body;
    db.query("INSERT INTO orders (user_email, items, total_price) VALUES (?, ?, ?)", [email, JSON.stringify(items), total], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Order placed!", orderId: result.insertId });
    });
});

// ADMIN ANALYTICS
app.get('/api/admin/analytics', (req, res) => {
    const q1 = "SELECT COUNT(*) as count FROM users";
    const q2 = "SELECT COUNT(*) as count FROM orders WHERE DATE(created_at) = CURDATE()";
    const q3 = "SELECT category, COUNT(*) as count FROM products GROUP BY category";
    const q4 = "SELECT items FROM orders";

    db.query(`${q1}; ${q2}; ${q3}; ${q4}`, (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send({ error: "Check if multipleStatements is true in your pool config." });
        }

        //  to count top items from JSON
        const allItems = [];
        results[3].forEach(row => {
            try {
                const parsed = JSON.parse(row.items);
                parsed.forEach(item => allItems.push(item.name));
            } catch (e) { /* skip empty/invalid JSON */ }
        });

        const counts = allItems.reduce((acc, name) => {
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {});

        const top3 = Object.entries(counts)
            .map(([name, total_ordered]) => ({ name, total_ordered }))
            .sort((a, b) => b.total_ordered - a.total_ordered)
            .slice(0, 3);

        res.send({
            totalUsers: results[0][0].count,
            dailyOrders: results[1][0].count,
            categories: results[2],
            topItems: top3
        });
    });
});

// --- ADMIN: MANAGE ORDERS & PRODUCTS ---
app.get('/api/admin/orders', (req, res) => {
    db.query("SELECT * FROM orders ORDER BY created_at DESC", (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.post('/api/admin/products', (req, res) => {
    const { name, price, ingredients, image_url, category } = req.body;
    db.query("INSERT INTO products (name, price, ingredients, image_url, category) VALUES (?, ?, ?, ?, ?)", 
    [name, price, ingredients, image_url, category], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Product Created!" });
    });
});

app.put('/api/admin/products/:id', (req, res) => {
    const { name, price, ingredients, image_url, category } = req.body;
    db.query("UPDATE products SET name=?, price=?, ingredients=?, image_url=?, category=? WHERE id=?", 
    [name, price, ingredients, image_url, category, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Product Updated!" });
    });
});

app.delete('/api/admin/products/:id', (req, res) => {
    db.query("DELETE FROM products WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Product Deleted!" });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));