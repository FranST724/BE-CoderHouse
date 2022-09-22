import fs from 'fs';
const dataProduct = 'src/persistence/products.json';
let init = [];

class Products {
	constructor() {}

	getALLProduct() {
		try {
			if (!fs.existsSync(dataProduct)) {
				return init;
			}
			const getList = fs.readFileSync(dataProduct, 'utf-8');
			const getProduct = JSON.parse(getList);
			return getProduct;
		} catch (error) {
			throw new Error('Error al obtener los productos');
		}
	}
	createProduct(product) {
		try {
			if (!fs.existsSync(dataProduct)) {
				init.push(product);
				fs.writeFileSync(dataProduct, JSON.stringify(init));
			} else {
				const products = fs.readFileSync(dataProduct, 'utf-8');
				const listProducts = JSON.parse(products);
				listProducts.push(product);
				fs.writeFileSync(dataProduct, JSON.stringify(listProducts));
				return product;
			}
		} catch (error) {
			throw new Error('Error al agregar un producto');
		}
	}
}

export default Products;
