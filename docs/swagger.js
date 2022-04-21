const swaggerJsdoc = require("swagger-jsdoc");


/**
 * Api config Info
 */

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Documentacion Rest api Disney',
        version: '1.0.0',
        description:
        'Es una rest api que nos permitira consultar las peliculas y los personajes de Disney',
        contact: {
            name: 'Raul Espina',
            url: 'www.linkedin.com/in/raul-espina-876b19230',
        },
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Development server',
        },
        {
            url: 'https://thawing-caverns-36216.herokuapp.com',
            description: 'Heroku server',
        },
    ],
    components: {
        securitySchemes:{
            OAuth: {
                type: "http",
                scheme: "basic"  
            }
        },
        schemas: {
            movie: {
                type: "object",
                required: ["titulo", "imagen", "fecha", "generoId"],
                properties: {
                    titulo: {
                        type:"string"
                    },
                    imagen: {
                        type:"string"
                    },
                    fecha: {
                        type:"date"
                    },
                    calificacion: {
                        type:"integer"
                    },
                    generoId: {
                        type:"integer"
                    },
                    personajes: {
                        type:"integer"
                    } 
                }
            },
            personaje: {
                type: "object",
                required: ["nombre", "imagen", "historia"],
                properties: {
                    nombre: {
                        type:"string"
                    },
                    imagen: {
                        type:"string"
                    },
                    historia: {
                        type:"string"
                    },
                    peso: {
                        type:"float"
                    },
                    edad: {
                        type:"integer"
                    },
                    peliculas: {
                        type: "integer"
                    }
                }
            },
            authRegister: {
                type: "object",
                required: ["email", "password", "name", "lastname"],
                properties: {
                    name: {
                        type:"string"
                    },
                    lastname: {
                        type:"string"
                    },
                    email: {
                        type:"string"
                    },
                    password: {
                        type:"string"
                    },
                }
            },
            authLogin: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type:"string"
                    },
                    password: {
                        type:"string"
                    },
                }
            }
        }
    }
};

/**
 * Opciones
 */
const option = {
    swaggerDefinition,
    apis:[
        "./router/*.js"
    ]
};

const openApiConfig = swaggerJsdoc( option );


module.exports = openApiConfig;