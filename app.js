require('dotenv').config('');
const Server   = require('./models/Server')
const NODE_ENV = process.env.NODE_ENV || 'deveploment';

const server = new Server();

if( NODE_ENV !==  'test'){
    server.listen();
}

const app = server.app;
  
module.exports = app