const supertest = require('supertest');
const app       = require('../app.js');

let id = 8;
const name = Math.random();

const crearMovie = {
    "titulo": `donal trump la pelucla ${name}`,
    "calificacion": 5,
    "fecha": "2022-04-13T00:00:00.000Z",
    "generoId": 1
}
const actualizarMovie = {
    "imagen": "http://localhost:8080/undefined",
    "titulo": `donal trump la pelucla (ACTUALIZADO)`,
    "calificacion": 5,
    "fecha": "2022-04-13T00:00:00.000Z",
    "generoId": 1,
}

const crearMovie_err = {
    "titulo": 10,
    "img": 55,
    "fecha": "habia una vezz...1212121",
}
describe('[movie] this route return all movies', ()=> {

    // Pruebas de exito
    test("prueba /movie retornar todas las peliculas, solo con imagen y tiutlo", async ()=>{
        const response = await supertest(app).get('/movie')
                                .set('x-key', process.env.JWT_TOKEN);
        expect( response.statusCode ).toEqual(200);
        expect( response.body ).toHaveProperty('peliculas');
    })
    test("prueba /movie?id=1 retornar las peliculas que conincidan con el parametro enviado", async ()=>{
        const response = await supertest(app).get('/movie?id=1')
                                             .set('x-key', process.env.JWT_TOKEN);
        expect( response.statusCode ).toEqual(200);
        expect( response.body ).toHaveProperty('peliculas');
    })
    test("prueba /movie/create crear una nueva pelicula", async ()=>{
        const response = await supertest(app).post('/movie/create')
                                             .set('x-key', process.env.JWT_TOKEN)
                                             .send(crearMovie);
        expect( response.statusCode ).toEqual(200);
        expect( response ).toHaveProperty('body');
    })
    test("prueba /movie/update?id actualizar una pelicula", async ()=>{
        const response = await supertest(app).put(`/movie/update?id=${id}`)
                                             .set('x-key', process.env.JWT_TOKEN)
                                             .send(actualizarMovie);
        expect( response.statusCode ).toEqual(200);
    })
    // test("prueba /movie/delete?id actualizar un personaje", async ()=>{
    //     const response = await supertest(app).delete(`/movie/delete?id=${id}`)
    //                                          .set('x-key', process.env.JWT_TOKEN)
    //     expect( response.statusCode ).toEqual(200);
    // })


    // pruebas de error
    test("prueba /movie token invalido", async ()=>{
        const response = await supertest(app).get('/movie').set('x-key',"erqerqer");
        expect( response.statusCode ).toEqual(401);
    })
    test("prueba /movie?id=100 no se encuentra la pelicula", async ()=>{
        const response = await supertest(app).get('/movie?id=100').set('x-key', process.env.JWT_TOKEN);
        expect( response.statusCode ).toEqual(404);
    })
    test("prueba /movie/create error pelicula existente", async ()=>{
        crearMovie.titulo = 'test-01'
        const response = await supertest(app).post('/movie/create').set('x-key', process.env.JWT_TOKEN).send(crearMovie);
        expect( response.statusCode ).toEqual(400);
    })
    test("prueba /movie/create datos incorrectos o faltantes", async ()=>{
        const response = await supertest(app).post('/movie/create').set('x-key', process.env.JWT_TOKEN).send(crearMovie_err);
        expect( response.statusCode ).toEqual(403);
    })
    test("prueba /movie/update pelicula no encontrada", async ()=>{
        const response = await supertest(app).put('/movie/update?id=1000').set('x-key', process.env.JWT_TOKEN).send(crearMovie);
        expect( response.statusCode ).toEqual(404);
    })
    test("prueba /movie/delete pelicula no encontrada", async ()=>{
        const response = await supertest(app).delete('/movie/delete?id=1000').set('x-key', process.env.JWT_TOKEN);
        expect( response.statusCode ).toEqual(404);
    })
})
