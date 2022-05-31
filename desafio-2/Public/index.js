const socket = io();
let productosSocket = [];
const div = document.getElementById('messages');
const btn = document.getElementById('enviar');
const inputNombre = document.getElementById('nombre');
const inputTexto = document.getElementById('texto');
const currentUser = `user-${Math.floor(Math.random() * 100)}`;

socket.on('productos', (data) => {
	console.log(data);
	productosSocket = data;
});
socket.emit('new-message', {
	title: 'producto0',
	price: '23',
	thumbnail: '',
	id: 0
});

// Chat
socket.emit('set-name', currentUser);
socket.on('user-connected', (name) => {
	console.log('user-connected', name);
});

btn.addEventListener('click', () => {
	const texto = inputTexto.value;
	inputTexto.value = '';
	socket.emit('new-message', {
		user: currentUser,
		text: texto,
		date: getNow()
	});
});

socket.on('messages', (messages) => {
	console.log('mensaje recibido');
	console.log(messages);
	div.innerHTML = messages
		.map((message) => {
			if (message.user === currentUser) {
				return `<div class="notification is-danger is-light"
			   style="text-align: justify; margin-left: 35px;     padding: 15px;
			   border-radius: 20px;">
				   <div>
				   <p>${message.text}</p>
				   </div>
				   <div
					   style="text-align: end; font-style: italic; font-weight: 400"
					   class="has-text-dark">
				   ${message.user} - ${message.date}
				   </div>
		   </div>`;
			} else {
				return `<div
	   class="notification is-primary is-light"
	   style=" text-align: justify; margin-rigth:35px;     padding: 15px;
	   border-radius: 20px;">
		   <div>
		   <p>${message.text}</p>
		   </div>
		   <div
		   style="text-align: end; font-style: italic; font-weight: 400"
		   class="has-text-dark"
		   >
		   ${message.user} - ${message.date}
		   </div>
	   </div>`;
			}
		})
		.join('');
});

getNow = () => {
	const now = new Date();
	return `${now.getHours()}:${now.getMinutes()}`;
};

console.log();
