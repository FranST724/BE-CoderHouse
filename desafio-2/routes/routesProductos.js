const Contenedor = require('./clase.js');
const { Router } = require('express');
const router = Router();

let contenedor = new Contenedor('./productos.txt');

router.get('/', async (req, res) => {
	console.log('Mostrando todos los productos');
	let productos = await contenedor.getAll();
	res.send(productos);
});

router.get('/:id', async (req, res) => {
	let { id } = req.params;
	let productoPorId = await contenedor.getById(parseInt(id));
	res.json(productoPorId);
});

router.post('/', async (req, res) => {
	let data = req.body;
	if (data.title) {
		await contenedor.save(data);
	}
	res.json('Objeto guardado exitosamente');
});

router.put('/:id', async (req, res) => {
	let { id } = req.params;
	let idParse = parseInt(id);
	let productos = await contenedor.getAll();
	arrayIndexPorId = [];
	productos.forEach((element, index) => {
		arrayIndexPorId.push({ elemId: element.id, elemIndex: index });
	});
	let productoASuplirIdIndex = arrayIndexPorId.find((producto) => producto.id);
	let indexElemSuplir = productoASuplirIdIndex.elemIndex;
	let productoModifEntrante = req.body;
	let productoModif = { id: idParse, ...productoModifEntrante };
	productos.splice(indexElemSuplir, 1, productoModif);
	await contenedor.deleteAll();
	productos.forEach(async (element) => {
		contenedor.save2(element);
	});
	res.json({ productoModificado: productoModif });
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	await contenedor.deleteById(parseInt(id));
	res.json({ mensaje: 'producto eliminado exitosamente' });
});

module.exports = router;
