import Router from 'express';
const mainScript = 'public/index.js';

const router = Router();

router.get('/', async (req, res) => {
	res.render('login.ejs', { mainScript });
});

router.post('/', (req, res) => {
	console.log(req.session);
	req.session.nombre = req.body.nombre;
	res.redirect('/');
});

export default router;
