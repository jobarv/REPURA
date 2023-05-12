const express = require("express");
const path = require('path');
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

const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory));

console.log(__dirname);

app.set('view engine', 'hbs');

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL conectado...")
    }
})

app.get("/", (req, res) => {
    // res.send("<h1>Home Page</h1>")
    res.render("index")
});

app.listen(5000, () => {
    console.log("El servidor esta corriendo en el puerto 5000");
})
