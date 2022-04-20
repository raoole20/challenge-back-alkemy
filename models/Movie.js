const { DataTypes } = require('sequelize');
const { db } = require('../config/mysql');

const Movie = db.define('pelicula-serie', {
    titulo: DataTypes.STRING,
    imagen: DataTypes.STRING,
    fecha: DataTypes.DATE,
    calificacion: DataTypes.NUMBER,
    generoId: DataTypes.NUMBER
})

module.exports = {
    Movie
}