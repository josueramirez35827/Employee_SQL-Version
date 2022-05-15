const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//create a connection to our database

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('App is listemimg on port' + listener.address().port)
})

// implementing CRUD

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employee_database", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result)
    }
  })
})

app.post("/employees", (req, res) => {
  const insertQuery = "INSERT INTO employees SET ?";
  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Employee Added to Database");
    }
  })
})

app.put("/employees", (req, res) => {
  const updateQuery = "UPDATE employee_database SET first_name = ?, last_name = ?, email = ?, address_street = ?, address_city = ?, address_state = ?, address_zip_code = ?, WHERE id = ?"
  db.query(
    updateQuery,
    [req.body.first_name, req.body.last_name, req.body.email, req.body.address_street, req.body.address_city, req.body.address_state, req.body.address_zip_code, req.body.id],
    (err, result) => {
      if (err) {
       console.log(err);
     } else {
      res.send(result);
    } 
  }
  )
})

app.delete("/employees/:id", (req, res) => {
  db.query(
    "DELETE FROM employees WHERE id = ?",
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  )
})
