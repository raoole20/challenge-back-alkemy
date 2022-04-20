const { check } = require('express-validator');

const validateResults = require('../../middleware/validarResultados');


const verifyCrear = [
    check('titulo')
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 100}),
    check('calificacion')
        .exists()
        .notEmpty(),
    check('fecha')
        .exists()
        .notEmpty(),
    check('generoId')
        .exists()
        .notEmpty(),
    (req, res, next) =>{
        return validateResults( req, res, next)
    }
]
const validarLogin = [
]



module.exports = {
    verifyCrear,
    validarLogin
}