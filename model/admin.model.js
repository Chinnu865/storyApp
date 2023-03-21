const { hashSync } = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const admin = sequelize.define("admin", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate:{
              isEmail: {
                msg: 'please enter a valid email'
              }
            },
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            defaultValue: null,
            set(value) {
              const password = hashSync(value, 10);
              this.setDataValue('password', password);
            }
        },
        token: {
            type: DataTypes.STRING,
            default:''
        }
    },{
        freezeTableName: true
    })
    return admin;
}
