import knex from 'knex';

class Contenedor {
	constructor(optionsknex, table) {
		this.knex = knex(optionsknex);
		this.table = table;
	}

	async save(object) {
		try {
			const nuevoProd = await this.knex(this.table).insert(object);
			return nuevoProd;
		} catch (err) {
			console.log(err.name, err.message);
		}
	}
	async getById(id) {
		try {
			const prodEncontrado = await this.knex.select('*').from(this.table).where('id', id);
			return prodEncontrado;
		} catch (err) {
			console.log(err.name, err.message);
		}
	}
	async getAll() {
		try {
			const productos = await this.knex.select('*').from(this.table);
			return productos;
		} catch (err) {
			console.log(err.name, err.message);
		}
	}
	async deleteById(id) {
		try {
			const prodElim = await this.knex.from(this.table).where('id', id).del();
			return prodElim;
		} catch (err) {
			console.log(err.name, err.message);
		}
	}
	async deleteAll() {
		try {
			return await this.knex.from(this.table).del();
		} catch (err) {
			console.log(err.name, err.message);
		}
	}
}

module.exports = Contenedor;
