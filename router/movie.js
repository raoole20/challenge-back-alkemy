const { Router } = require('express');

const {
    getAll,
    getWhere,
    consulta,
    crearPelicula,
    actualizarPelicula,
    eliminarPelicula
} = require('../controllers/movieControllers');
const verifyUsers     = require('../helpers/validators/verifyUsers');
const { verifyCrear } = require('../helpers/validators/verifyMovie');
const uploadMiddleware = require('../helpers/funciones')

const router = Router();

//Validar todas las rutas antes de relizar las consultas 
router.all('/*', verifyUsers )

/** 
 * @swagger
 * /movie:
 *   get:
 *     tags: 
 *       - movie 
 *     parameters: 
 *       - in: header
 *         name: x-key
 *         schema: 
 *              type: string
 *         required: true  
 *     summary: obtener todas las peliculas 
 *     description: obtener todas las peliculas se puede usar order y limit como parametros para mejorar la busqueda
 *     responses:
 *       200:
 *         description: (OK) La informacion de la pelicula se obtuvo correctamente.
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
 *                      description: id de la pelicula
 *                      example: 1
 *                     titulo:
 *                      type: string
 *                      description: titulo de la pelicula
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
 * /movie?id=1&limit=10:
 *   get:
 *     tags: 
 *       - movie 
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
 *         name: title
 *         schema: 
 *              type: string
 *         description: filtra por la nombre de la pelicula      
 *       - in: query
 *         name: generoId
 *         schema: 
 *              type: integer
 *         description: filtra por el genero de la pelicula
 *       - in: query
 *         name: order
 *         schema: 
 *              type: string
 *              enum: 
 *                  - ASC
 *                  - DESC
 *         description: filtra por el genero de la pelicula
 *     summary: obtener todas las peliculas filtradas por un parametro o varios
 *     description: obtener todas las peliculas se puede usar order y limit como parametros para mejorar la busqueda
 *     responses:
 *       200:
 *         description: (OK) La informacion de la pelicula se obtuvo correctamente.
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
 *                      description: id de la pelicula
 *                      example: 1
 *                     titulo:
 *                      type: string
 *                      description: titulo de la pelicula
 *                      example: Blanca nieves 
 *                     imagen: 
 *                      type: string
 *                      description: imagen de la pelicula
 *                      example: img/blancanieves.jpg
 *                     calificacion: 
 *                      type: string
 *                      description: calificacion de la pelicula
 *                      example: img/blancanieves.jpg
 *                     generoId: 
 *                      type: string
 *                      description: generoId de la pelicula
 *                      example: img/blancanieves.jpg
 *                     fecha: 
 *                      type: string
 *                      description: fecha de la pelicula
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
router.get( '/', verifyUsers , consulta  );

/** 
 * @swagger
 * /movie/create:
 *   post:
 *     tags: 
 *       - movie
 *     parameters: 
 *       - in: header
 *         name: x-key
 *         schema: 
 *              type: string
 *         required: true     
 *     summary: crea una nueva pelicula 
 *     description: Crea una nueva pelicula  y retorna la pelicula pelicula, se necesita autentificacion por token
 *     requestBody:
 *       content:
 *          multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 imagen: 
 *                  type: string
 *                  format: binary
 *                 titulo: 
 *                  type: string
 *                  format: text 
 *                 calificacion: 
 *                  type: int
 *                  format: text 
 *                 fecha: 
 *                  type: string
 *                  format: text 
 *                 generoId: 
 *                  type: string
 *                  format: text 
 *                 personajes: 
 *                  type: array
 *                  format: text  
 *     responses:
 *       201:
 *         description: (Create) pelicula creada correctamete.
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
 *                      description: id de la pelicula
 *                      example: 1
 *                     titulo:
 *                      type: string
 *                      description: titulo de la pelicula
 *                      example: Blanca nieves 
 *                     imagen: 
 *                      type: string
 *                      description: imagen de la pelicula
 *                      example: img/blancanieves.jpg
 *                     generoId: 
 *                      type: integer
 *                      description: Genero de la pelicula
 *                      example: 1
 *                     calificacion: 
 *                      type: integer
 *                      description: calificacion base 5 
 *                      example: 5
 *                     fecha: 
 *                      type: date
 *                      description: Fecha en la que la pelicula fue creada 
 *                      example: 2022-04-13
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
router.post('/create', uploadMiddleware.single('imagen'), verifyCrear ,crearPelicula );

/** 
 * @swagger
 * /movie/update?id:
 *   put:
 *     tags: 
 *       - movie
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
 *     summary: actualizar a una  pelicula 
 *     description: actualiza a un pelicula mediante su id
 *     responses:
 *       200:
 *         description: (OK) La informacion de la pelicula se actualizo correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 body:
 *                   type: object
 *                   properties:
*                     msg:
 *                      type: text
 *                      description: mensaje de exito
 *                      example: Pelicula actualizada correctamente
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
router.put('/update',  uploadMiddleware.single('imagen') , actualizarPelicula );

/** 
 * @swagger
 * /movie/delete?id:
 *   delete:
 *     tags: 
 *       - movie
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
 *     summary: elimina una pelicula 
 *     description: elimina una pelicula mediante su id
 *     responses:
 *       200:
 *         description: (OK) La informacion de la pelicula se elimino correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 body:
 *                   type: object
 *                   properties:
*                     msg:
 *                      type: text
 *                      description: mensaje de exito
 *                      example: Pelicula eliminada correctamente
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
router.delete('/delete', eliminarPelicula )
 
module.exports = router;