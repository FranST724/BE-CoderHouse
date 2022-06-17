const express = require('express');
const routesProductos = require('./routes/routesProductos');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Contenedor = require('./clase.js');
// DB
import { options } from './configDB';
import knex from 'knex';

const app = express();

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

//Nuevo server de chat
const messages = [];

// Nuevo servidor para el chat
(async () => {
	try {
		// crear tabla
		await knex(options).schema.createTableIfNotExists('usuarios', (table) => {
			table.increments('id').primary().unique();
			table.string('name');
			table.string('email');
			table.integer('edad');
		});
		await knex(options)('usuarios').insert(usuarios);
		console.log('Datos insertados');
		await knex(options).from('usuarios').select('*').then((data) => {
			console.log(data);
		});
		await knex(options).from('usuarios').where('name', 'Juan').select('*').then((data) => {
			console.log(data);
		});
		await knex(options)
			.from('usuarios')
			.where('id', 1)
			.update({
				name: 'Juan Pablo'
			})
			.then((data) => {
				console.log(data);
			});
	} catch (err) {
		console.log(err);
	}
})();

const PORT = 8080;
const server = httpServer.listen(PORT, () => {
	console.log(`Servidor Http escuchando en el puerto ${PORT}`);
});
server.on('error', (error) => console.log(`error: ${error}`));
