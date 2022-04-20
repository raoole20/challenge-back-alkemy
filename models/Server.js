const express = require('express');
const cors    = require('cors');
const swaggerUI = require('swagger-ui-express');

const { db }            = require('../config/mysql');
const authRouter        = require('../router/auth');
const charactersRouter  = require('../router/characters');
const movieRouter       = require('../router/movie');
const generoRouter      = require('../router/genero');
const openApiConfig     = require('../docs/swagger');


class Server {

    constructor(){
        this.app  = express();
        this.db   = db;
        this.PORT = process.env.PORT;

        this.authPath       = '/auth';
        this.charactersPath = '/characters';
        this.moviePath      = '/movie';
        this.generoPath     = '/genero';
        this.swaggerPath    = '/docs';

        this.middlewarer();
        this.router();
    }

    get App(){
        return this.app;
    }
    middlewarer(){
        this.app.use( cors() );
        this.app.use( express.json()) ;
        this.app.use( express.static('public') );
    }

    async dbConnect(){
        try {
            await this.db.authenticate();
            console.log('conexion con la base de datos correcta');
        } catch (error) {
            console.log('conexion con la base de datos incorrecta');
        }
    }

    router(){
        this.app.use( this.swaggerPath, swaggerUI.serve, swaggerUI.setup(openApiConfig) );

        this.app.use( this.authPath,       authRouter);
        this.app.use( this.charactersPath, charactersRouter);
        this.app.use( this.moviePath,      movieRouter );
        this.app.use( this.generoPath,     generoRouter );
    }

    listen(){
        this.app.listen( this.PORT, ()=>{
            console.log(`Servidor corriendo en localhost:${this.PORT}`)
            this.dbConnect();
        })
    }
}



module.exports = Server;