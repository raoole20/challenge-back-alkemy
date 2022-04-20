const { Sequelize } = require('sequelize');
 
const host = process.env.HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;


const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host,
    dialect: 'mysql',
    loggin: false
});

module.exports = { 
    db
}