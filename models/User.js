const { DataTypes } = require('sequelize');

const { db } = require('../config/mysql');

const User = db.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
      type: DataTypes.STRING
  }
}, {
  timetamps: false
});

module.exports = {
    User
}                                                