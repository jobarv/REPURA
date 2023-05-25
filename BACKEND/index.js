const express = require("express");
const session = require('express-session');
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");

dotenv.config({ path: './config.env' })

const app = express();

//Conexion a la base de datos
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

})

//Desde donde se trae la configuracion public
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));



//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());

console.log(__dirname);

app.set('view engine', 'hbs');

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL conectado...")
    }
})

//Define las rutas
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


//Puerto en el que corre el server
app.listen(5000, () => {
    console.log("El servidor esta corriendo en el puerto 5000");
})
