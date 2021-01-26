const express = require("express");
const app = express();
const path = require('path');
const mysql = require("mysql");
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public/images'));

app.set('views', './views')

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));



const db = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "",

    database: "web_app",

});
db.connect((err) => {

    if (err) {

        throw err;

    }

    console.log("MySql Connected");

});

app.get('/', (req, res) => {
    res.render("index");
});

// app.get("/createdb", (req, res) => {

//     let sql = "CREATE DATABASE nodemysql";

//     db.query(sql, (err) => {

//         if (err) {

//             throw err;

//         }

//         res.send("Database created");

//     });

// });
app.get("/createemployee", (req, res) => {

    let sql =

        "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), phonenumber INT(10), PRIMARY KEY(id))";

    db.query(sql, (err) => {

        if (err) {

            throw err;

        }
        res.send("Employee table created");

    });

});
app.post("/adddata", (req, res) => {

    let post = { name: req.body.name, designation: req.body.email };

    let sql = "INSERT INTO employee SET ?";

    let query = db.query(sql, post, (err) => {

        if (err) {

            throw err;

        }

        res.redirect('/showdata')

    });




});
app.get('/showdata', function(req, res, next) {
    var sql = 'SELECT * FROM employee';
    db.query(sql, function(err, data, fields) {
        if (err) throw err;
        res.render('showdata', { title: 'User List', userData: data });
    });
});

app.get("/users/edit/:id", (req, res) => {

    let newName = "JILSO";

    let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`;

    let query = db.query(sql, (err) => {

        if (err) {

            throw err;

        }

        res.send("Post updated...");

    });

});

app.get("/users/delete/:id", (req, res) => {

    let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;

    let query = db.query(sql, (err) => {

        if (err) {

            throw err;

        }

        res.send("Employee deleted");

    });

});



app.listen(2000)