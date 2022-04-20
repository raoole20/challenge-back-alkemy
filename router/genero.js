const { Router }  = require('express');
const verifyUsers = require('../helpers/validators/verifyUsers');
const {
    getAll
} = require('../controllers/generoControllers');
const router = Router();


/** 
 * @swagger
 * /genero:
 *   get:
 *     tags: 
 *       - genero 
 *     parameters: 
 *       - in: header
 *         name: x-key
 *         schema: 
 *              type: string
 *         required: true    
 *     summary: obtener todos los generos  
 *     description: obtener todos los generos
 *     responses:
 *       200:
 *         description: (OK) La informacion del genero se obtuvo correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 body:
 *                   type: object
 *                   properties:
*                     id:
 *                      type: integer
 *                      description: id del genero
 *                      example: 1
 *                     nombre:
 *                      type: string
 *                      description: nombre del genero
 *                      example: romance
 *                     imagen: 
 *                      type: string
 *                      description: imagen 
 *                      example: img/romance.jpg
 *                     descripcion: 
 *                      type: string
 *                      description: descripcion del genero 
 *                      example: trata sobre el amor
 *                      
 * 
 *       400:
 *         description: (BadRequest) los datos enviados son incorrectos o faltan datos
 *       401:
 *         description:  (Unauthorized) no tiene autorización para llamar al servicio.
 *       404:
 *         description: (NotFound) no se ha encontrado la informacion
 *       500:
 *         description: (ServerError) error en el servidor
 */
router.get( '/', verifyUsers , getAll  );



module.exports = router;