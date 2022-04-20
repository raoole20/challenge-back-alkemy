const express = require('express');

const { authRegister, authLogin } = require('../controllers/authControllers');
const { validarLogin, validarRegister } = require('../helpers/validators/auth');

const router = express.Router();

/** 
 * @swagger
 * /auth/register:
 *   post:
 *     tags: 
 *       - auth 
 *     summary: Registra un nuevo usuario
 *     description: Crea un nuevo Usuario y obtener un JWT, para para poder ser autenticado
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: "#/components/schemas/authRegister" 
 *     responses:
 *       200:
 *         description: Usuario registrado con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token: 
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                 body:
 *                   type: object
 *                   properties:
 *                     name:
 *                      type: string
 *                      description: nombre del usuario
 *                      example: raul 
 *                     lastname: 
 *                      type: string
 *                      description: apellido del usuairo
 *                      example: espina
 *                     email: 
 *                      type: string
 *                      description: correo con el que se eegistro el usuario
 *                      example: correo@correo.com
 *       400:
 *         description: (BadRequest) los datos enviados son incorrectos o faltan datos
 *       401:
 *         description:  (Unauthorized) no tiene autorización para llamar al servicio.
 *       404:
 *         description: (NotFound) no se ha encontrado la informacion
 *       500:
 *         description: (ServerError) error en el servidor
 */
router.post('/register', validarRegister , authRegister );
   
/** 
 * @swagger
 * /auth/login:
 *   post:
 *     tags: 
 *       - auth 
 *     summary: accede con un usuario
 *     description: accede a la api utilizando un email y un password registrados con anterioridad
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: "#/components/schemas/authLogin"  
 *     responses:
 *       200:
 *         description: (ok) usuario logeado con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token: 
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                 body:
 *                   type: object
 *                   properties:
 *                     name:
 *                      type: string
 *                      description: nombre del usuario
 *                      example: raul 
 *                     lastname: 
 *                      type: string
 *                      description: apellido del usuairo
 *                      example: espina
 *                     email: 
 *                      type: string
 *                      description: correo con el que se eegistro el usuario
 *                      example: correo@correo.com
 *       400:
 *         description: (BadRequest) los datos enviados son incorrectos o faltan datos
 *       401:
 *         description:  (Unauthorized) no tiene autorización para llamar al servicio.
 *       404:
 *         description: (NotFound) no se ha encontrado la informacion
 *       500:
 *         description: (ServerError) error en el servidor
 */
router.post('/login',    validarLogin    , authLogin );

module.exports =  router;