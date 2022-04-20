const supertest = require('supertest');
const app       = require('../app.js');

let id = 2;
const name = Math.random();

const crearPersonaje = {
    "nombre": `donal trump ${name}`,
    "edad": 9,
    "peso": 55,
    "historia": "habia una vezz...1212121",
    "imagen": "http://localhost:8080/file-1650462510870.jpg"
}
const actualizarPersonaje = {
    "nombre": "donal trump (actualizado)",
    "edad": 10,
    "peso": 55,
    "historia": "habia una vezz...1212121",
    "imagen": "http://localhost:8080/file-1650462510870.jpg"
}

const crearPersonaje_err = {
    "edad": 10,
    "peso": 55,
    "historia": "habia una vezz...1212121",
}
describe('[characters] this route return all characters', ()=> {

    // Pruebas de exito
    test("prueba /characters retornar todos los personajes, solo con imagen y nombre", async ()=>{
        const response = await supertest(app).get('/characters')
                                .set('x-key', process.env.JWT_TOKEN);
        expect( response.statusCode ).toEqual(200);
        expect( response.body ).toHaveProperty('personajes');
    })
    test("prueba /characters?id=1 retornar los personajes que conincidan con el parametro enviado", async ()=>{
        const response = await supertest(app).get('/characters?id=1')
                                             .set('x-key', process.env.JWT_TOKEN);
        expect( response.statusCode ).toEqual(200);
        expect( response.body ).toHaveProperty('personaje');
    })
    test("prueba /characters/create crear un nuevo personaje", async ()=>{
        const response = await supertest(app).post('/characters/create')
                                             .set('x-key', process.env.JWT_TOKEN)
                                             .send(crearPersonaje);
        expect( response.statusCode ).toEqual(200);
        expect( response ).toHaveProperty('body');
    })
    test("prueba /characters/update?id actualizar un personaje", async ()=>{
        const response = await supertest(app).put(`/characters/update?id=${id}`)
                                             .set('x-key', process.env.JWT_TOKEN)
                                             .send(actualizarPersonaje);
        expect( response.statusCode ).toEqual(200);
    })
    // test("prueba /characters/delete?id actualizar un personaje", async ()=>{
    //     const response = await supertest(app).delete(`/characters/delete?id=${id}`)
    //                                          .set('x-key', process.env.JWT_TOKEN)
    //     expect( response.statusCode ).toEqual(200);
    // })


    // pruebas de error
    test("prueba /characters token invalido", async ()=>{
        const response = await supertest(app).get('/characters').set('x-key',"erqerqer");
        expect( response.statusCode ).toEqual(401);
    })
    test("prueba /characters?id=100 no se encuentra el personaje", async ()=>{
        const response = await supertest(app).get('/characters?id=100').set('x-key', process.env.JWT_TOKEN);
        expect( response.statusCode ).toEqual(404);
    })
    test("prueba /characters/create error personaje existente", async ()=>{
        crearPersonaje.nombre = 'pepito'
        const response = await supertest(app).post('/characters/create').set('x-key', process.env.JWT_TOKEN).send(crearPersonaje);
        expect( response.statusCode ).toEqual(400);
    })
    test("prueba /characters/create datos incorrectos o faltantes", async ()=>{
        const response = await supertest(app).post('/characters/create').set('x-key', process.env.JWT_TOKEN).send(crearPersonaje);
        expect( response.statusCode ).toEqual(400);
    })
    test("prueba /characters/update datos incorrectos o faltantes", async ()=>{
        const response = await supertest(app).put('/characters/update?id=1000').set('x-key', process.env.JWT_TOKEN).send(crearPersonaje);
        expect( response.statusCode ).toEqual(404);
    })
    test("prueba /characters/delete datos incorrectos o faltantes", async ()=>{
        const response = await supertest(app).delete('/characters/delete?id=1000').set('x-key', process.env.JWT_TOKEN);
        expect( response.statusCode ).toEqual(404);
    })
})