import { Router } from 'express';
import { fork } from 'child_process';
import os from 'os';
const nroCPUs = os.cpus().length;
const router = Router();

const info = {
	'Node version': process.version,
	Platform: process.platform,
	'Directorio de ejecución': process.cwd(),
	'ID del proceso': process.pid,
	'Uso de la memoria': process.memoryUsage(),
	'Memoria total reservada (rss)': process.memoryUsage().rss,
	'path de ejecución': process.execPath,
	'Argumentos de entrada': process.argv,
	CPUs: nroCPUs
};

router.get('/info', (req, res) => {
	res.send(info);
});

router.get('/api/randoms', (req, res) => {
	const cant = req.query.cant || 100000000;
	const child = fork('./src/getRandom.js');
	child.send(cant);
	child.on('message', (msg) => {
		res.send(msg);
	});

	child.on('exit', (code) => {
		console.log('Se ha cerrado el proceso', code);
	});
});

export default router;
