import { options } from './configDB';
import knex from 'knex';

const products = [
	{
		name: 'Remera',
		description: 'Talle 2',
		code: 24567,
		thumbnail: 'htttt/jkljkhj',
		price: 4500,
		stock: 23
	},
	{
		name: 'Pantalón',
		description: 'Talle 3',
		code: 24987,
		thumbnail: 'htttt/jkljkhj',
		price: 3500,
		stock: 45
	},
	{
		name: 'Vestido ',
		description: 'Talle 4',
		code: 36987,
		thumbnail: 'htttt/jkljkhj',
		price: 7500,
		stock: 6
	}
];

(async () => {
	const db = knex(options.mysql);
	try {
		/**create table */
		await db.schema.createTableIfNotExists('products', (table) => {
			table.increments('id').primary();
			table.string('name');
			table.string('description');
			table.integer('price');
			table.integer('stock');
			table.string('thumbnail');
			table.string('code');
		});
		/** 🦸‍♀️ CREATE - Insert raw (insertar uno o mas  registro(s))*/
		await db('products').insert(products);
		console.log('Datos insertados');
	} catch (err) {
		console.log(err);
	}
})();
