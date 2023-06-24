const express = require('express');
const path = require('path');

const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:h(\\d+)/:w(\\d+)', (req, res) => {
	const height = parseInt(req.params.h);
	const width = parseInt(req.params.w);
	res.sendFile(path.join(__dirname, 'jogo.html'));
});

app.listen(port, hostname, () => {
	console.log('Servidor rodando em http://' + hostname + ':' + port + '/');
});
