const express = require('express');
const app = express();
const routesProductos = require('./routes/routesProductos');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Contenedor = require('./clase.js');
// DB
import { options } from './configDB.js';
import knex from 'knex';

const archivoNuevo = new Contenedor(options.mariaDB, 'productos');
const mensajesLlegados = new Contenedor(options.sqlite, 'mensajes');

//Los dos servidores
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

let contenedor2 = new Contenedor();

//Midddlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/api/productos', routesProductos);

//Inicializando server
io.on('connection', (socket) => {
	console.log('a user connected');
	socket.emit('mi mensaje', 'Este es el mensaje');

	socket.on('new-message', async (data) => {
		await contenedor2.save(data);
		const list = await contenedor2.getAll();
		io.sockets.emit('productos', list);
	});
});

io.on('notificacion', (data) => {
	console.log(data, 'Llego exitosamente');
});

const messages = [];
const productos = [];

async function devolverMensajes() {
	messages = await mensajesLlegados.getAll();
	io.sockets.emit('mensajesEnviados', messages);
}

async function devolverProds() {
	productos = await archivoNuevo.getAll();
	io.sockets.emit('productosEnviados', productos);
}

//Levanto el servidor io
io.on('connection', (socket) => {
	console.log('cliente conectado');

	devolverProds();
	socket.on('newProduct', async (product) => {
		await archivoNuevo.save(product);
		productos = await archivoNuevo.getAll();
		io.sockets.emit('productosEnviados', productos);
	});

	devolverMensajes();
	socket.on('newMessage', async (data) => {
		await mensajesLlegados.save(data);
		messages = await mensajesLlegados.getAll();
		io.sockets.emit('mensajesEnviados', messages);
	});
});

const PORT = 8080;
const server = httpServer.listen(PORT, () => {
	console.log(`Servidor Http escuchando en el puerto ${PORT}`);
});
server.on('error', (error) => console.log(`error: ${error}`));
