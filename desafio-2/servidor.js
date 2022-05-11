const http = require('http');
const express = require('express');
const Contenedor = require('./clase.js');
const body_parser = require('body-parser');

const app = express();
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 8080;

let contenedor = new Contenedor('./productos.txt');

app.get('/', (req, res) => {
	res.send('Desafío 3');
});

app.get('/productos', async (req, res) => {
	console.log('Mostrando todos los productos');
	let productos = await contenedor.getAll();
	res.send(productos);
});

app.get('/productoRandom', async (req, res) => {
	console.log('Mostrando producto random');
	let productoRandom = await contenedor.getAll();
	res.json(productoRandom[random(await productoRandom.length)]);
});

app.post('/', async (req, res) => {
	let data = req.body;
	if (data.title) {
		await contenedor.save(data);
	}
	res.send('Objeto guardado exitosamente');
});

app.listen(8080);
console.log(`Servidor Http escuchando en el puerto ${PORT}`);
