const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const squel = require("squel");

const app = express();
const PORT = 3000;

// Body parser middleware
app.use(bodyParser.json());

// PostgreSQL Client
const client = new Client({
  host: "localhost",
  user: "postgres", 
  password: "argusadmin",  
  database: "squel",
  port: 5432
});

client.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error(" DB connection error", err.stack));


// GET all users
app.get("/users", async (req, res) => {
  try {
    const query = squel.select().from("users").toString();
    const result = await client.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const query = squel.select()
      .from("users")
      .where("id = ?", req.params.id)
      .toString();
    const result = await client.query(query);
    if (result.rows.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new user
app.post("/users", async (req, res) => {
  try {
    const { name, age } = req.body;
    const query = squel.insert()
      .into("users")
      .set("name", name)
      .set("age", age)
      .returning("*")  
      .toString();
    const result = await client.query(query);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update user by ID
app.put("/users/:id", async (req, res) => {
  try {
    const { name, age } = req.body;
    const query = squel.update()
      .table("users")
      .set("name", name)
      .set("age", age)
      .where("id = ?", req.params.id)
      .returning("*")
      .toString();
    const result = await client.query(query);
    if (result.rows.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const query = squel.delete()
      .from("users")
      .where("id = ?", req.params.id)
      .returning("*")
      .toString();
    const result = await client.query(query);
    if (result.rows.length === 0) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted", user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});