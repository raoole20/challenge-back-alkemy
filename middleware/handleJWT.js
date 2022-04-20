const jwt = require('jsonwebtoken');

const crearJWT = ( usuario ) =>{

    const payload = {
        id: usuario.id,
        name: usuario.name,
        lastname: usuario.lastname
    }
    const token = jwt.sign( payload, process.env.JWT_KEY, {
        
    })
    return token;
}

const validarWJT = ( token ) =>{
    return jwt.verify( token, process.env.JWT_KEY )
}

module.exports = {
    crearJWT,
    validarWJT
}