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
        .isNumeric(),
    check('peso')
        .exists()
        .notEmpty()
        .isNumeric(),
    check('historia')
        .exists()
        .notEmpty()
        .isLength({ min: 20, max: 100}),
    (req, res, next) =>{
        return validateResults( req, res, next)
    }
]
const validarLogin = [
    check('email')
        .exists()
        .notEmpty()
        .isEmail(),
    check('password')
        .exists()
        .notEmpty()
        .isLength({min: 8, max: 99}),
    (req, res, next) =>{
        return validateResults( req, res, next)
    }
]



module.exports = {
    verifyCrear,
    validarLogin
}