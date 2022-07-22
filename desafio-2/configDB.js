import 'dotenv/config';

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;
console.log(DB_NAME, 'hola');

const options = {
	mysql: {
		client: 'mysql',
		connection: {
			host: 'localhost',
			user: 'root',
			password: process.env.DB_PASSWORD,
			database: 'ecommerce'
		},
		pool: { min: 0, max: 10 }
	},
	sqlite: {
		client: 'sqlite3',
		connection: {
			filename: './ecommerce.sqlite'
		},
		useNullAsDefault: true
	},
	mongoDB: {
		URL: `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.8lz5w.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
		optiones: {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	}
};

export default options;
