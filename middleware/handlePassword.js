const bcryptjs = require('bcryptjs');

const hashPassword =  ( passwordPlane )=>{
    const password =  bcryptjs.hashSync(passwordPlane, 10)
    return password;
}

const verificarPassword =  ( passwordPlane, passwordHash )=>{
    return  bcryptjs.compareSync(passwordPlane, passwordHash);
}

module.exports = {
    hashPassword,
    verificarPassword
}