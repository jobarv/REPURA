const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


//Conexion a la base de datos
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

exports.register = (req, res) => {
    console.log(req.body);

    // const name = req.body.username;
    // const password = req.body.password;
    // const passwordConfirm = req.body.passwordConfirm;

    const { username, email, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.render('register', {
                message: 'Ese correo ya está registrado'
            })
        } else if (password != passwordConfirm) {
            return res.render('register', {
                message: 'La contraseña no coincide'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', { username: username, email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'Usuario Registrado'
                });
            }
        })

    });
}
exports.login = (req, res) => {
    // Capture the input fields
    let { username, password } = req.body;

    // Ensure the input fields exists and are not empty
    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                req.session.loggedin = true;
                req.session.username = username;
                // Redirect to home page
                res.redirect('/dashboard');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
    // http://localhost:5000/
    app.get('/', function (req, res) {
        // If the user is loggedin
        if (req.session.loggedin) {
            // Output username
            res.send('Welcome back, ' + req.session.username + '!');
        } else {
            // Not logged in
            res.send('Please login to view this page!');
        }
        res.end();
    });
}
