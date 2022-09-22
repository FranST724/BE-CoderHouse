import { assert } from 'chai';
import Products from '../daos/product.js.js';
import request from 'supertest';

describe('TESTEAR FUNCIONAMIENTO DE LA CLASE DAOS PRODUCTS', () => {
	const product = new Products();
	it('Testeo cantidad de productos', () => {
		assert.lengthOf(product.getALLProduct(), 3);
	});
	it('Testear si es un array', () => {
		assert.typeOf(product.getALLProduct(), 'array');
	});
});

describe('TESTEAR ENDPOINTS', () => {
	describe('GET', () => {
		it('Testear Status', async () => {
			const getProduct = await request('http://localhost:8082').get('/api/productos');
			assert.equal(getProduct.status, 200);
		});
		it('Testear cantidad de productos', async () => {
			const getProduct = await request('http://localhost:8082').get('/api/productos');
			assert.lengthOf(getProduct.body, 3);
		});
	});
});
