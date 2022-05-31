const express = require('express');
const routesProductos = require('./routes/routesProductos');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Contenedor = require('./clase.js');

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
io.on('connection', (socket) => {
	console.log('New user connected. Soquet ID : ', socket.id);
	socket.on('set-name', (name) => {
		console.log('set-name', name);
		socket.emit('user-connected', name);
		socket.broadcast.emit('user-connected', name);
	});

	socket.on('new-message', (message) => {
		messages.push(message);
		socket.emit('messages', messages);
		socket.broadcast.emit('messages', messages);
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});

const PORT = 8080;
const server = httpServer.listen(PORT, () => {
	console.log(`Servidor Http escuchando en el puerto ${PORT}`);
});
server.on('error', (error) => console.log(`error: ${error}`));
