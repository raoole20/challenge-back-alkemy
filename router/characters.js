const { Router } = require('express');

const {
    consulta,
    crearPersonaje,
    actualizarPersonaje,
    eliminarPersonaje
} = require('../controllers/charactersControllers');
const verifyUsers      = require('../helpers/validators/verifyUsers');
const { verifyCrear }  = require('../helpers/validators/verifyPersonajes');
const uploadMiddleware = require('../helpers/funciones')
const router = Router();

//Validar todas las rutas antes de relizar las consultas 
router.all('/*', verifyUsers )
     
/**   
 * @swagger
 * /characters:
 *   get:
 *     tags: 
 *       - characters
 *     parameters: 
 *       - in: header
 *         name: x-key
 *         schema: 
 *              type: string
 *         required: true
 *     summary: obtener todos los personajes
 *     description: Obtener todos los personajes, se puede usar order y limit como parametros para mejorar la busqueda
 *     responses:
 *       200:
 *         description: (OK) La informacion del personaje se obtuvo correctamente.
 *         security:
 *          - OAuth: []
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
 *                      description: id del personaje
 *                      example: 1
 *                     nombre:
 *                      type: string
 *                      description: nombre del personaje
 *                      example: Blanca nieves 
 *                     imagen: 
 *                      type: string
 *                      description: imagen del personaje
 *                      example: img/blancanieves.jpg
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
/** 
 * @swagger
 * /characters?limit=10&id=1:
 *   get:
 *     tags: 
 *       - characters
 *     parameters: 
 *       - in: header
 *         name: x-key
 *         schema: 
 *              type: string
 *         required: true 
 *       - in: query
 *         name: id
 *         schema: 
 *              type: integer
 *         description: filtra por el id       
 *       - in: query
 *         name: limit
 *         schema: 
 *              type: integer
 *         description: el numero de items para retornar       
 *       - in: query
 *         name: age
 *         schema: 
 *              type: integer
 *         description: filtra por la edad      
 *       - in: query
 *         name: peso
 *         schema: 
 *              type: integer
 *         description: filtra por el peso
 *       - in: query
 *         name: name
 *         schema: 
 *              type: string
 *         description: filtra por el nombre
 *     summary: obtener todos los personajes filtradas por un parametro o varios
 *     description: Obtener todos los personajes, o aquellos filtrados por el parametro enviado como name, peso, age, movieId, id 
 *     responses:
 *       200:
 *         description: (OK) La informacion del personaje se obtuvo correctamente.
 *         security:
 *          - OAuth: []
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
 *                      description: id del personaje
 *                      example: 1
 *                     nombre:
 *                      type: string
 *                      description: nombre del personaje
 *                      example: Blanca nieves 
 *                     imagen: 
 *                      type: string
 *                      description: imagen del personaje
 *                      example: img/blancanieves.jpg
 *                     peso: 
 *                      type: integer
 *                      description: peso del personaje (Kg)
 *                      example: 55
 *                     edad: 
 *                      type: integer
 *                      description: edad del personaje
 *                      example: 18
 *                     historia: 
 *                      type: integer
 *                      description: historia del personaje
 *                      example: habia una vez...
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
router.get( '/', verifyUsers , consulta  );
  
/** 
 * @swagger
 * /characters/create:
 *   post:
 *     tags: 
 *       - characters
 *     parameters: 
 *       - in: header
 *         name: x-key
 *         schema: 
 *              type: string
 *         required: true  
 *     summary: crea un nuevo personaje 
 *     description: Crea un nuevo perosonaje y retorna un nuevo personaje, se necesita autentifica
 *     requestBody:
 *       content:
 *          multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 imagen: 
 *                  type: string
 *                  format: binary
 *                 nombre: 
 *                  type: string
 *                  format: text 
 *                 edad: 
 *                  type: string
 *                  format: text 
 *                 peso: 
 *                  type: string
 *                  format: text 
 *                 historia: 
 *                  type: string
 *                  format: text 
 *                 peliculas: 
 *                  type: string
 *                  format: text 
 *     responses:
 *       201:
 *         description: (Create) personaje actualizado correctamente
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
 *                      description: id del personaje
 *                      example: 1
 *                     nombre:
 *                      type: string
 *                      description: nombre del personaje
 *                      example: Blanca nieves 
 *                     imagen: 
 *                      type: string
 *                      description: imagen del personaje
 *                      example: http://localhost:8080/file-1649869001396.jpg
 *                     peso: 
 *                      type: integer
 *                      description: peso del personaje en kg
 *                      example: 48.3
 *                     edad: 
 *                      type: integer
 *                      description: edad del personaje 
 *                      example: 18
 *                     historia: 
 *                      type: longtext
 *                      description: historia del personaje  
 *                      example: habia una vez....
 *                     peliculas: 
 *                      type: longtext
 *                      description: historia del personaje 
 *                      example: blanca nieves
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
router.post('/create',  uploadMiddleware.single('imagen'), verifyCrear ,crearPersonaje );


/** 
 * @swagger
 * /characters/update?id:
 *   put:
 *     tags: 
 *       - characters
 *     parameters: 
 *       - in: header
 *         name: x-key
 *         schema: 
 *              type: string
 *         required: true   
 *       - in: query
 *         name: id
 *         schema: 
 *              type: integer
 *         description:  id  del personaje a actualizar
 *         required: true  
 *     summary: actualizar a un  personaje 
 *     description: actualiza un personaje mediante su id
 *     requestBody:
 *       content:
 *          multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 imagen: 
 *                  type: string
 *                  format: binary
 *                 nombre: 
 *                  type: string
 *                  format: text 
 *                 edad: 
 *                  type: string
 *                  format: text 
 *                 peso: 
 *                  type: string
 *                  format: text 
 *                 historia: 
 *                  type: string
 *                  format: text 
 *                 peliculas: 
 *                  type: string
 *                  format: text  
 *     responses:
 *       200:
 *         description: (OK) La informacion del personaje se actualizo correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 body:
 *                   type: object
 *                   properties:
*                     msg:
 *                      type: integer
 *                      description: mensaje
 *                      example: personaje actualizado con exito
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
router.put('/update', uploadMiddleware.single('imagen') ,actualizarPersonaje );

/** 
 * @swagger
 * /characters/delete?id:
 *   delete:
 *     tags: 
 *       - characters
 *     parameters: 
 *       - in: header
 *         name: x-key
 *         schema: 
 *              type: string
 *         required: true   
 *       - in: query
 *         name: id
 *         schema: 
 *              type: integer
 *         description:  id  del personaje a eliminar
 *         required: true            
 *     summary: elimina un personaje mediante su id
 *     description: elimina un personaje mediante su id
 *     responses:
 *       200:
 *         description: (OK) La informacion del personaje se elimino correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 body:
 *                   type: object
 *                   properties:
*                     msg:
 *                      type: integer
 *                      description: personaje eliminado con exito
 *                      example: personaje eliminado con exito
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
router.delete('/delete', eliminarPersonaje )
 
module.exports = router;