const { request, response, next } = require('express');
const handleError   = require('../../middleware/handleError');
const { validarWJT} = require('../../middleware/handleJWT');

const verifyUsers = ( req = request, res = response, next = next) => { 
    const token = req.headers['x-key'];
    try{
        if( validarWJT(token ) ){
            // console.log(`token valido `)
            next();
            return;
        }
    }catch( err ) {
        console.log('token invalido');
        return handleError(res, "ERROR_ACESS_TOKEN", 401);
    }
}


module.exports = verifyUsers;