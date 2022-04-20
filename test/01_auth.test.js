const supertest = require('supertest');

const app       = require('../app.js');
const { User }  = require('../models/User');
const { db }    = require('../config/mysql');

const testLogin = {
    "email": "name@name.com",
    "password": "123123123123123"
}
const testLogin_err = {
    "email": "test@test.com",
    "password": "test_011222"
}
const testLogin_err_bad = {
    "eail": "test_100@test.com",
    "password": "test_011222"
}

const testLogin_err_email = {
    "email": "te11st@test.com",
    "password": "test0000000110"
}

const name = Math.random();

const testRegister = {
    "name": "test_01",
    "lastname": "test_01",
    "email": `test_${name}@test.com`,
    "password": "test0000000110"
}
const testregister_err = {
    "name": "test_01",
    "email": "test@test.com",
    "password": "test_0110"
}
const testRegister_exists = {
    "name": "test_01",
    "lastname": "test_01",
    "email": "test@test.com",
    "password": "test_0110"
}

/**
 * Ejecutar antes
 */
beforeAll( ()=>{ 
})

describe('[auth] esta es la prueba de /auth', ()=> {

    // test de exitos 
    test("prueba de crear un usuario", async ()=>{
        const response = await supertest(app).post('/auth/register')
                                .send(testRegister);
        expect( response.statusCode ).toEqual(200);
        expect( response.body ).toHaveProperty('body');
        expect( response.body ).toHaveProperty('token');
    })
    test("prueba de logear a un usuario", async ()=>{
        const response = await supertest(app).post('/auth/login')
                                .send(testLogin);
        expect( response.statusCode ).toEqual(200);
        expect( response.body ).toHaveProperty('body');
        expect( response.body ).toHaveProperty('token');
    })

    // test errors login
    test("password incorrecta", async ()=>{
        const response = await supertest(app).post('/auth/login').send(testLogin_err);
        expect( response.statusCode ).toEqual(401);
    })
    test("probando datos faltantes o mal escritos", async ()=>{
        const response = await supertest(app).post('/auth/login').send(testLogin_err_bad);
        expect( response.statusCode ).toEqual(403);
    })
    test("usuario no encontrado", async ()=>{
        const response = await supertest(app).post('/auth/login').send(testLogin_err_email);
        expect( response.statusCode ).toEqual(404);
    })


    // test errors register
    test("probando datos faltantes o mal escritos", async ()=>{
        const response = await supertest(app).post('/auth/register').send(testregister_err);
        expect( response.statusCode ).toEqual(403);
    })
    test("usuario no encontrado", async ()=>{
        const response = await supertest(app).post('/auth/register').send(testRegister_exists);
        expect( response.statusCode ).toEqual(400);
    })

})