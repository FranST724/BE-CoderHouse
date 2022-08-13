import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function esPrimo(numero) {
	for (let i = 2; i < numero; i++) {
		if (numero % i === 0) return false;
	}
	return true;
}

function listarNumerosPrimos(numero) {
	console.log('Listando numeros primos hasta el numero: ' + numero);
	let numerosPrimos = [];
	for (let i = 2; i < numero; i++) {
		console.log(i);
		console.log(esPrimo(i));
		if (esPrimo(i)) {
			numerosPrimos.push(i);
		}
	}
	console.log(numerosPrimos);
	return numerosPrimos;
}

app.use('/primos', (req, res, next) => {
	const limiteSuperior = req.query.num || 100;
	const numerosPrimos = listarNumerosPrimos(limiteSuperior);
	res.send(numerosPrimos);
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
	console.log(`🚀 Server started on PORT ${PORT} at ${new Date().toLocaleString()}`)
);
server.on('error', (err) => console.log(err));
