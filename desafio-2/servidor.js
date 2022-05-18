const http = require('http');
const express = require('express');
const app = express();
const routesProductos = require('./routes/routesProductos');

//Midddlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/api/productos', routesProductos);

//Inicializando server
const PORT = 8080;
const server = app.listen(PORT, () => {
	console.log(`Servidor Http escuchando en el puerto ${PORT}`);
});
server.on('error', (error) => console.log(`error: ${error}`));
