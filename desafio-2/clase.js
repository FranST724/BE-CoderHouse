import * as fs from 'fs';

class Contenedor {
	constructor(file) {
		this.file = file;
	}

	async save(objeto) {
		try {
			const data = await fs.promises.readFile(this.file, 'utf-8');
			const prevData = JSON.parse(data);
			const IdCount = prevData.length + 1;
			const newObject = { ...objeto, id: IdCount };
			prevData.push(newObject);
			console.log(prevData);
			await fs.promises.writeFile(`./${this.file}`, `${JSON.stringify(prevData)}`);
			return IdCount;
		} catch (error) {
			console.log('error', error);
		}
	}

	async getById() {
		try {
			const data = await fs.promises.readFile(this.file, 'utf-8');
			const prevData = JSON.parse(data);
			const productId = prevData.find((producto) => producto.id === id);
			if (productId === undefined) {
				console.log(null);
			} else {
				console.log(productId);
			}
		} catch (err) {
			console.log(err);
		}
	}

	async getAll() {
		try {
			const data = await fs.promises.readFile(this.file, 'utf-8');
			const prevData = JSON.parse(data);
			console(prevData);
		} catch (err) {
			console.log(err);
		}
	}

	async deleteById(id) {
		try {
			const data = await fs.promises.readFile(this.file, 'utf-8');
			const prevData = JSON.parse(data);
			const productId = prevData.find((producto) => producto.id === id);
			if (productId) {
				const productDelete = prevData.filter((producto) => producto.id !== id);
				await fs.promises.writeFile(`./${this.file}`, `${JSON.stringify(productDelete)}`);
				console.log('objeto eliminado exitosamente');
			} else {
				console.log('No hay un producto para eliminar');
			}
		} catch (err) {
			console.log(err);
		}
	}

	async deleteAll() {
		try {
			const deleteAll = [];
			await fs.promises.writeFile(`./${this.file}`, `${JSON.stringify(deleteAll)}`);
			console.log('todos los objetos fueron eliminados exitosamente');
		} catch (err) {
			console.log(err);
		}
	}
}

export default Contenedor;
