process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';


import  dotenv from 'dotenv';
import Server from './models/server';
//import {container} from './container'

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
})
console.log(process.env.APP_FOO)

const server = new Server()

server.listen()

//TODO: configurar para que se ejecute un solo archivo main.js para que se almacene en un solo archivo todo el tipado, el problema es la compatabilidad con commonjs