import express from 'express';
import routesProductos from './routes/routesProductos.js';
import { default as normalizr } from 'normalizr';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import Contenedor from './clase.js';
import { faker } from '@faker-js/faker';
import options from './configDB.js';
import { inspect } from 'util';
const { normalize, schema, denormalize } = normalizr;
const app = express();
// DB

const archivoNuevo = new Contenedor(options.mariaDB, 'productos');
// const mensajesLlegados = new Contenedor(options.sqlite, 'mensajes');
function print(obj) {
	console.log(inspect(obj, { depth: null }));
}

const mensajesLlegados = () => {
	const mensajes = [];
	for (let i = 0; i < 10; i++) {
		mensajes.push({
			id: faker.random.numeric(5),
			author: {
				id: faker.random.numeric(5),
				nombre: faker.name.firstName(),
				apellido: faker.name.lastName(),
				email: faker.internet.email()
			},
			texto: faker.lorem.sentence(),
			date: faker.date.past().getTime()
		});
	}
	return mensajes;
};
console.log(mensajesLlegados);

const chatOriginal = {
	id: faker.random.numeric(5),
	nombre: faker.company.companyName(),
	mensajesLlegados: mensajesLlegados()
};

//Los dos servidores
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

let contenedor2 = new Contenedor();

//Midddlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../Public'));
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

const authorSchema = new schema.Entity('authors');

const msjSchema = new schema.Entity('mensajes', {
	id: { type: String },
	autor: authorSchema,
	texto: '',
	timestamp: { type: Number }
});

const chatSchema = new schema.Entity('chats', {
	id: { type: String },
	nombre: '',
	mensajes: [ msjSchema ]
});

const chatNormalized = normalize(chatOriginal, chatSchema);

print(chatNormalized);

const bytesChatNormalized = Buffer.byteLength(JSON.stringify(chatNormalized), 'utf-8');
console.log(bytesChatNormalized);

const bytesChatOriginal = Buffer.byteLength(JSON.stringify(chatOriginal), 'utf-8');
console.log(bytesChatOriginal);

const difference = bytesChatOriginal - bytesChatNormalized;
const porcentaje = difference * 100 / bytesChatOriginal;
console.log(porcentaje, difference);

const PORT = 8080;
const server = httpServer.listen(PORT, () => {
	console.log(`Servidor Http escuchando en el puerto ${PORT}`);
});
server.on('error', (error) => console.log(`error: ${error}`));
