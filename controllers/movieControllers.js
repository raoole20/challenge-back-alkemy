const fs = require('fs').promises;

const { request, response } = require('express');
const { matchedData } = require('express-validator');

const {  Movie }    = require('../models/Movie');
const { Personaje } = require('../models/Personaje')
const { Genero }    = require('../models/Genero')
const  ActorMovie   = require('../models/ActorMovie')
const handleError   = require('../middleware/handleError'); 

Movie.belongsToMany(Personaje, { through: ActorMovie });
Personaje.belongsToMany(Movie, { through: ActorMovie });

Genero.hasOne( Movie , { foreignKey: 'generoId'} );
Movie.belongsTo(Genero);

const publicURL = process.env.PUBLIC_URL;

const consulta = ( req = request, res = response ) => {
    const { title, generoId, order, id } = req.query;

    if( title ||  generoId || order || id  ){
        getWhere( req, res )
    }else{
        getAll( req, res )
    }
}
   
const getAll = async ( req = request, res = response )=>{

    const { limit, order } =  req.query;
    
    const limite =  limit === undefined ? 20 : parseInt( limit) ;
    const orden  = order === undefined? "ASC": order;
    
    try {
        const peliculas = await Movie.findAll({
            attributes: ['titulo', 'imagen', 'fecha'],
            limit:  limite,
            order: [
                ['id', orden]
            ]
        });
        res.send( {
            peliculas
        });
    } catch (error) {
        console.log(error)
        handleError(res, 'GET_ALL_PELICULAS', 500)
    }
}
  
const getWhere = async ( req = request, res = response )=>{
    let { title, generoId, order, id, limit  } = req.query;
    const obj = {};
    if( title ){
        obj.titulo = title
    }else if( generoId ){
        obj.generoId = generoId;
    }else if( id ){
        obj.id = id;
    } 

    const limite =  limit === undefined ? 20 : parseInt( limit) ;
    const orden  = order === undefined? "ASC": order;

    try {
        const peliculas = await Movie.findAll({
            where: obj,
            include:[
                { 
                    model: Personaje,
                },
                {
                    model: Genero
                }
            ],
            limit:  limite,
            order: [
                ['id', orden]
            ]
        });
        if( peliculas.length === 0 ){
            return res.status(404).json({
                msg: `pelicula no encontrada`
            });
        }
        res.send( {
            peliculas,
        });
    } catch (error) {
        console.log( error );
        handleError(res, 'GET_WHERE_PELICULAS', 500)
    }
}
const crearPelicula = async ( req = request, res = response ) =>{

    let { body, file } = req;

    body.calificacion = parseInt( body.calificacion )
    body.generoId     = parseInt( body.generoId )

    const imagen =`${publicURL}/${file?.fieldname}`;

    body = { ...body, imagen};

    console.log( body )

    try {
        let pelicula = await Movie.findOne({ where: { titulo: body.titulo} });

        if( pelicula ){
            return handleError(res, "PELICULA_EXISTE", 400);
        }

        pelicula = await Movie.create( body );

        res.json({
            body: pelicula
        });
    } catch (error) {
        console.log( error );
        handleError(res, "ERROR_CREATE_PELICULA", 500);
    }
}
const actualizarPelicula = async ( req = request, res = response ) =>{

    let { body, file } = req;
    const id  = req.query.id;

    if( body.calificacion !== undefined ) body.calificacion = parseInt( body.calificacion );
    if( body.generoId     !== undefined ) body.generoId     = parseInt( body.generoId );

    try {
        const pelicula = await Movie.findOne( { where: { id: id } } )

        if( !pelicula ){
            return res.status(404).json({
                msg: `pelicula con el ID ${id}, no existe en la base de datos`
            });
        }
        if( file ){
            const img = pelicula.imagen.split('/').pop()
            const path = `${__dirname}/../public/${img}`;

            const imagen =`${publicURL}/${file.fieldname}`;
            body = { ...body, imagen};

            fs.unlink(path)
                .then(  ()    => console.log('imagen borrada') )
                .catch( (err) => console.log( err ) )
        }
        await Movie.update( body ,{ where: { id: id} } );

        res.json({
            msg: "Pelicula actualizada correctamente"
        });
    } catch (error) {
        console.log( error );
        handleError(res, "ERROR_UPDATE_PELICULAS", 500);
    }
}

const eliminarPelicula = async ( req = request, res = response ) =>{
    const id = req.query.id;
    try {
        const pelicula = await Movie.findOne( { where: { id: id } } )
        
        if( !pelicula ){
            return res.status(404).json({
                msg: `pelicula con el ID ${id}, no existe en la base de datos`
            });
        }
        
        const img = pelicula.imagen.split('/').pop()
        const path = `${__dirname}/../public/${img}`;
        
        fs.unlink(path)
            .then(  ()    => console.log('imagen borrada') )
            .catch( (err) => console.log( err ) )

        await Movie.destroy({ where: { id: id} });

        res.json({
           msg: "Pelicula eliminada correctamente"
        });
    } catch (error) {
        console.log( error );
        handleError(res, "ERROR_DELETE_PELICULA", 500);
    }
}

module.exports = {
    getAll,
    getWhere,
    consulta,
    crearPelicula,
    actualizarPelicula,
    eliminarPelicula
}