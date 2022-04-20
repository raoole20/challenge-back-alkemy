const { DataTypes } = require('sequelize');
const { db } = require('../config/mysql');

const Genero = db.define('genero', {
    nombre: DataTypes.STRING,
    imagen: DataTypes.STRING,
    descripcion: DataTypes.STRING
})

module.exports = {
    Genero
}