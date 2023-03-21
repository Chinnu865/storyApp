const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('new', 'root', 'abcd@123', {
    dialect:'mysql',
    host:"127.0.0.1",
    logging: false
})

sequelize.authenticate()
    .then( ()=> {
        console.log('database connected');
    })
    .catch((e) => {
        console.log(e);
    })

const User = require('../model/admin.model')( sequelize, DataTypes )
sequelize.sync();

module.exports = User;
