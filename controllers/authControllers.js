const express = require('express');
const { matchedData } = require('express-validator');

const {User, createUser } = require('../models/User');

const { crearJWT }     = require('../middleware/handleJWT');
const { hashPassword, verificarPassword } = require('../middleware/handlePassword');
const handleError      = require('../middleware/handleError');
const email     = require('../helpers/email')

const authLogin = async (req, res )=> {

    let datos = matchedData( req );  

    try {
        let usuario = await User.findOne({ where: { email: datos.email} });
      
        if( !usuario ){
            return handleError(res, "ERROR_USER_NOT_FOUND", 404);
        }

        const verificado = verificarPassword( datos.password, usuario.password);

        if( verificado ){
            usuario.password = null;
            const token =  crearJWT( req.body ); 
            return res.status(200).json( {
                token,
                body: usuario
            });
        }else{
            return handleError(res,"PASSWORD_INVALIDA", 401);
        }

    } catch (error) {
        handleError(res, "ERROR_LOGIN_USERS", 500);
    }
    
}
const authRegister = async (req, res ) =>{

    let datos = matchedData( req );
    const password = hashPassword( datos.password );
    datos = { ...datos, password }   

    try {
        let usuario = await User.findOne({ where: { email: datos.email} });

        if( usuario ){
            return handleError(res, "ERROR_USER_EXIST", 400);
        }

        usuario = await User.create( datos );
        usuario.password = null;

        const sendgrid_email = process.env.SENDGRID_EMAIL;
        const msg = {
            to: usuario.email,
            from: sendgrid_email, // Use the email address or domain you verified above
            subject: 'Tu cuenta ha sido creada correctamente',
            text: 'Felicidades por tu nueva cuenta, ya eres parte de nuestra familia!',
            html: '<h1>Se confirmo la cuenta con exito</h1>',
        };

        email(msg)

        const token =  crearJWT( req.body );

        return res.status(200).json( {
            token,
            body: usuario
        });
    } catch (error) {
        console.log( error );
        handleError(res, "ERROR_REGISTER_USERS", 500);
    }
}


module.exports = {
    authLogin, 
    authRegister
}