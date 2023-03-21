require("./database/database")
const express = require('express');

const app = express();
// const db = require('./model/admin.model');
const session = require('express-session');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(
    session({
        secret:'thisisrandomstuff',
        resave:false,
        saveUninitialized:false,
        cookie:{
            expires: 1000*100*6
        }   
    })
);

const router = require('./router/index');
app.use('/api', router);

app.listen(3000, ()=> {
    console.log('Server Connected');
})

// db( sequelize, DataTypes ).sync({ alter: true})
//     .then(() => {
//         app.listen(3000, ()=> {
//             console.log('Connected');
//         })
//     })
//     .catch((e) => {
//         console.log(e);
//     })
