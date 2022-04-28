import Contenedor from './clase.js';

const main = async () => {
	let contenedor = new Contenedor('./productos.txt');
	await contenedor.save({
		title: 'Regla',
		price: 200
	});
	await contenedor.getById();
	await contenedor.getAll();
	await contenedor.deleteById();
	await contenedor.deleteAll();
};
main();
