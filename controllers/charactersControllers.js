const fs = require('fs').promises;

const { request, response } = require('express');
const { matchedData } = require('express-validator');

const { Personaje } = require('../models/Personaje');
const { Movie }     = require('../models/Movie');
const { Genero }    = require('../models/Genero')
const  ActorMovie   = require('../models/ActorMovie')
const handleError   = require('../middleware/handleError'); 

Movie.belongsToMany(Personaje, { through: ActorMovie });
Personaje.belongsToMany(Movie, { through: ActorMovie });

Genero.hasOne( Movie , { foreignKey: 'generoId'} );
Movie.belongsTo(Genero);

const publicURL = process.env.PUBLIC_URL

const consulta = ( req = request, res = response ) => {
    const { name, peso, age, movieId, id } = req.query;

    if( name ||  peso || age|| movieId || id){
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
        const personajes = await Personaje.findAll({
            attributes: ['nombre', 'imagen'],
            limit:  limite,
            order: [
                ['id', orden]
            ]
        });
        res.send( {
            personajes
        });
    } catch (error) {
        handleError(res, 'GET_ALL_ERR', 500)
    }
}

const getWhere = async ( req = request, res = response )=>{

    const { name, peso, age, movieId, id, limit } = req.query;

    const obj = {};
    if( name ){
        obj.nombre = name
    }else if( peso ){
        obj.peso = peso;
    }else if( age ){
        obj.edad = age;
    }else if( movieId ){
        obj['pelicula-series'] = movieId;
    }else if( id ){
        obj.id = id;
    }

    const limite =  limit === undefined ? 20 : parseInt( limit) ;

    try {
        const personaje = await Personaje.findAll({
            where: obj,
            include:[
                { 
                    model: Movie,
                    include: {
                        model: Genero
                    }
                }
            ],
            limit:  limite,
        });

        if( personaje.length === 0 ){
            return res.status(404).json({
                msg: `personaje no encontrado`
            });
        }
        res.send( {
            personaje,
        });
    } catch (error) {
        handleError(res, 'GET_WHERE_NAME', 500)
    }
}
const crearPersonaje = async ( req = request, res = response ) =>{

    let { body, file } = req;

    body.edad = parseInt( body.edad )
    body.peso = parseFloat( body.peso )

    console.log( file );
    const imagen =`${publicURL}/${file?.fieldname}`;

    body = { ...body, imagen};

    try {
        let personaje = await Personaje.findOne({ where: { nombre: body.nombre} });

        if( personaje ){
            return handleError(res, "PESONAJE_YA_EXISTE", 400);
        }
        
        personaje = await Personaje.create( body );

        res.json({
            body: personaje
        });
    } catch (error) {
        handleError(res, "ERROR_CREATE_PERSONAJES", 500);
    }
}
const actualizarPersonaje = async ( req = request, res = response ) =>{
   
    let { body, file } = req;
    const id  = req.query.id;

    if( body.edad !== undefined ) body.edad = parseInt( body.edad );
    if( body.peso !== undefined ) body.peso = parseFloat( body.peso );

    try {
        const personaje = await Personaje.findOne( { where: { id: id } } )
        if( !personaje ){
            return res.status(404).json({
                msg: `personaje con el ID ${id}, no existe en la base de datos`
            });
        }
        if( file ){
            const img = personaje.imagen.split('/').pop()
            const path = `${__dirname}/../public/${img}`;

            const imagen =`${publicURL}/${file.fieldname}`;
            body = { ...body, imagen};

            fs.unlink(path)
                .then(  ()    => console.log('imagen borrada') )
                .catch( (err) => console.log( err ) )
        }
        await Personaje.update( body ,{ where: { id: id} });

        res.json({
            msg: "personaje actualizado correctamente"
        });

    } catch (error) {
        console.log( error );
        handleError(res, "ERROR_UPDATE_PERSONAJES", 500);
    }
}

const eliminarPersonaje = async ( req = request, res = response ) =>{
    const id = req.query.id;
    try {
        const personaje = await Personaje.findOne( { where: { id: id } } )
        if( !personaje ){
            return res.status(404).json({
                msg: `personaje con el ID ${id}, no existe en la base de datos`
            });
        }
        await Personaje.destroy({ where: { id: id} });

        const img = personaje.imagen.split('/').pop()
        const path = `${__dirname}/../public/${img}`;

        fs.unlink(path)
            .then(  ()    => console.log('imagen borrada') )
            .catch( (err) => console.log( err ) )


        res.json({
           msg: "personaje eliminado correctamente"
        });
    } catch (error) {
        console.log( error );
        handleError(res, "ERROR_DELETE_PERSONAJES", 500);
    }
}

module.exports = {
    getAll,
    getWhere,
    consulta,
    crearPersonaje,
    actualizarPersonaje,
    eliminarPersonaje
}