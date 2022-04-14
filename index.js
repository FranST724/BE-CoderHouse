class Usuario {
	constructor(nombre, apellido, libros, mascotas) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.libros = libros;
		this.mascotas = mascotas;
	}

	getFullName() {
		return this.nombre + ' ' + this.apellido;
	}

	addMascota(mascota) {
		this.mascotas.push(mascota);
	}

	countMascotas() {
		return this.mascotas.length;
	}

	addBook(nombre, autor) {
		this.libros.push({ nombre, autor });
	}

	getBookNames() {
		return this.libros.map((libro) => libro.nombre);
	}
}

const usuario = new Usuario(
	'Jorge',
	'Iglesias',
	[
		{
			nombre: 'El señor de las moscas',
			autor: 'William Golding'
		},
		{
			nombre: 'Fundación',
			autor: 'Isaac Asimov'
		}
	],
	[ 'gato' ]
);

usuario.addMascota('perro');
usuario.addBook('Juego de tronos', 'George R.R. Martin');

console.log(usuario.getFullName());
console.log(usuario.getBookNames());
console.log(usuario.mascotas);
console.log(usuario.countMascotas());
console.log(usuario.libros);
console.log(usuario.getBookNames());
