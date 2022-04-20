const { check } = require('express-validator');

const validateResults = require('../../middleware/validarResultados');


const verifyCrear = [
    check('nombre')
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 40}),
    check('edad')
        .exists()
        .notEmpty()
    check('peso')
        .exists()
    check('historia')
        .exists()
        .notEmpty()
        .isLength({ min: 20, max: 100}),
    check('imagen')
        .exists()
        .notEmpty()
    (req, res, next) =>{
        return validateResults( req, res, next)
    }
]
const validarActualizar = [

]



module.exports = {
    verifyCrear,
    validarActualizar
}