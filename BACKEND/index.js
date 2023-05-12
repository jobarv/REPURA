const express = require("express");
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'})

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

})

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL conectado...")
    }
})

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>")
});

app.listen(5000, () => {
    console.log("El servidor esta corriendo en el puerto 5000");
})
