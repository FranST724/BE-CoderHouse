import knex from 'knex';

class Mensajes {
	constructor(optionsknex, table) {
		this.knex = knex(optionsknex);
		this.table = table;
	}
	async save(object) {
		try {
			const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');
			const arrayProductos = JSON.parse(contenido);
			let posteriorId = 0;
			if (arrayProductos.length === 0) {
				posteriorId = 1;
			} else {
				let ultimoId = 0;
				arrayProductos.forEach((element) => {
					ultimoId = element.id;
				});
				posteriorId = ultimoId + 1;
			}
			let objeto = {
				id: posteriorId,
				email: object.email,
				fecha: object.fecha,
				message: object.message
			};
			arrayProductos.push(objeto);
			await fs.promises.writeFile(`./${this.file}`, `${JSON.stringify(arrayProductos)}`);
		} catch (err) {
			console.log('save error', err);
		}
	}
	async getAll() {
		try {
			const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');
			const arrayProductos = JSON.parse(contenido);
			return arrayProductos;
		} catch (err) {
			console.log('getAll error', err);
		}
	}
}

module.exports = Mensajes;
