const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

process.on('uncaughtException', err => {
	process.exit(1);
});

dotenv.config({ path: '.env' });

const DB = process.env.DATABASE;

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(con => console.log('DB connection succesful!'))
	.catch(err => console.log(err));
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {});

process.on('unhandledRejection', err => {
	console.log(err);
	server.close(() => {
		process.exit(1);
	});
});

process.on('SIGTERM', () => {
	server.close(() => {});
});
