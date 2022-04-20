const { DataTypes } = require('sequelize');
const { db } = require('../config/mysql');

const ActorMovie = db.define('actormovie',{
    personajeId: DataTypes.NUMBER,
    peliculaSerieId: DataTypes.NUMBER
});

module.exports = ActorMovie