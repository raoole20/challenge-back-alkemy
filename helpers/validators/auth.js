const { request, response, next } = require('express');
const { check } = require('express-validator');

const validateResults = require('../../middleware/validarResultados');


const validarRegister = [
    check('name')
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 40}),
    check('email')
        .exists()
        .notEmpty()
        .isEmail(),
    check('password')
        .exists()
        .notEmpty()
        .isLength({min: 8, max: 99}),
    check('lastname')
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 40}),
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
    validarRegister,
    validarLogin
}