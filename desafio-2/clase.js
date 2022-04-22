const fs = require('fs');

class Contenedor {
	constructor(file) {
		this.file = file;
	}

	async save() {
		try {
			const data = await fs.promises.readFile(this.file, 'utf-8');
			return JSON.parse(data);
		} catch (error) {
			console.log('error', error);
		}
	}
}

export default Contenedor;
