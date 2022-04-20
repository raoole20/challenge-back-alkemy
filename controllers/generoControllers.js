const { Genero } = require('../models/Genero');

const getAll =  async ( req, res ) =>{
    const { limit, order } =  req.query;
    
    const limite =  limit === undefined ? 20 : parseInt( limit) ;
    const orden  = order === undefined? "ASC": order;

    try {
        const generos = await Genero.findAll({
            limit:  limite,
            order: [
                ['id', orden]
            ]
        });
        res.send( {
            generos
        });
    } catch (error) {
        handleError(res, 'GET_ALL_ERR', 500)
    }
}

module.exports = {
    getAll
}