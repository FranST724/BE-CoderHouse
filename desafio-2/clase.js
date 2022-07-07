class Contenedor {
	constructor() {
		this.productos = [
			{
				title: 'producto0',
				price: '23',
				thumbnail: '',
				id: 0
			}
		];
	}

	async save(objeto) {
		try {
			const IdCount = this.productos.length;
			const newObject = { ...objeto, id: IdCount };
			this.productos.push(newObject);
			return IdCount;
		} catch (error) {
			console.log('error', error);
		}
	}

	async update(objeto, id) {
		try {
			const prevObjectIndex = this.productos.findIndex((element) => {
				return element.id === parseInt(id);
			});
			const newObject = { ...objeto, id: parseInt(id) };
			this.productos[prevObjectIndex] = newObject;
			console.log(prevObjectIndex);
		} catch (error) {
			console.log('error', error);
		}
	}

	async getById(id) {
		try {
			console.log(this.productos);
			const product = this.productos.find((producto) => producto.id === id);
			if (product === undefined) {
				console.log(null);
			} else {
				return product;
			}
		} catch (err) {
			console.log(err);
		}
	}

	async getAll() {
		try {
			return this.productos;
		} catch (err) {
			console.log(err);
		}
	}

	async deleteById(id) {
		try {
			const productId = this.productos.find((producto) => producto.id === id);
			if (productId) {
				const productDelete = this.productos.filter((producto) => producto.id !== id);
				this.productos = productDelete;
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
			this.productos = [];
			console.log('todos los objetos fueron eliminados exitosamente');
		} catch (err) {
			console.log(err);
		}
	}
}

export default Contenedor;
