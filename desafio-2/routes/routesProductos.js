const Contenedor = require('../clase.js');
const { Router } = require('express');
const router = Router();
const mainScript = 'public/index.js';
const multer = require('multer');

let contenedor = new Contenedor();

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/uploads');
	}
});
router.use(multer({ storage }).single('thumbnail'));

router.get('/', async (req, res) => {
	console.log('Mostrando todos los productos');
	let productos = await contenedor.getAll();
	res.render('index.ejs', { productos, mainScript });
});

// router.get('/:id', async (req, res) => {
//	let { id } = req.params;
//	let productoPorId = await contenedor.getById(parseInt(id));
//	res.json(productoPorId);
// });

router.post('/', async (req, res) => {
	console.log(req.body);
	let data = req.body;
	let photo = req.file;
	data.thumbnail = '/uploads/' + photo.filename;
	if (data.title) {
		await contenedor.save(data);
	}
	res.redirect('/api/productos');
});

// router.put('/:id', async (req, res) => {
//	let { id } = req.params;
//	let data = req.body;
//	if (data.title) {
//		await contenedor.update(data, id);
//	}
//	res.json('exito');
// });

// router.delete('/:id', async (req, res) => {
//	const { id } = req.params;
//	await contenedor.deleteById(parseInt(id));
//	res.json({ mensaje: 'producto eliminado exitosamente' });
//});

module.exports = router;
