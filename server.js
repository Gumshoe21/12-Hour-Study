const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
// comment from ndb
// HANDLING UNCAUGHT EXCEPTIONS
// we put this at the top so that it can catch any errors that come only after its declaration
process.on('uncaughtException', (err) => {
  process.exit(1); // code 0 = success; code 1 = uncaught exception
});
// we MUST first read our env var's from the config file and then run the code in the app file
dotenv.config({ path: 'config.env' });

// this is the link that mongoDB supplies us with so we can connect to the database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  // LOCAL DB: .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  // if we don't add a catch() here we will get an Unhandled Promise Rejection if there's an error
  .then((con) => console.log('DB connection succesful!'));
// .catch(err => console.log('ERROR'));

//console.log(con.connections);

/*
const testTour = new Tour({
  name: 'The Park Camper',
  price: 497
});

testTour.save().then(doc => {
}).catch(err => {
  console.log('ERROR:', err);
});
*/
// env variable set by express
// console.log(app.get('env'));

// variables set by node
// console.log(process.env);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  // console.log(`App running on port ${port}...`);
});

// handling unhandled rejections
//
process.on('unhandledRejection', (err) => {
  // console.log(err.name, err.message);
  // console.log('UNHANDLED REJECTION; SHUTTING DOWN...');
  server.close(() => {
    // close server THEN shut down process
    process.exit(1); // code 0 = success; code 1 = uncaught exception
  });
});

process.on('SIGTERM', () => {
  // console.log('SIGTERM RECEIVED. Shutting down gracefully.');
  server.close(() => {
    // console.log('Process terminated.');
  });
});
