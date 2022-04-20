const { DataTypes } = require('sequelize');
const { db } = require('../config/mysql' );

const Personaje = db.define('personaje', {
    nombre: DataTypes.STRING,
    imagen: DataTypes.STRING,
    edad: DataTypes.NUMBER,
    peso: DataTypes.DECIMAL,
    historia: DataTypes.STRING
});

module.exports = {
    Personaje
}