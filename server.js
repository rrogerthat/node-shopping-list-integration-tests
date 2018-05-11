
const express = require('express');
const morgan = require('morgan');

const app = express();

const shoppingListRouter = require('./shoppingListRouter');
const recipesRouter = require('./recipesRouter');

// log the http layer
app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// when requests come into `/shopping-list` or
// `/recipes`, we'll route them to the express
// router instances we've imported. Remember,
// these router instances act as modular, mini-express apps.
app.use('/shopping-list', shoppingListRouter);
app.use('/recipes', recipesRouter);

// both runServer and closeServer need to access the same
// server object, so we declare `server` here, and then when
// runServer runs, it assigns a value.
let server;

// this function starts our server and returns a Promise.
// In our test code, we need a way of asynchronously starting
// our server, since we'll be dealing with promises there.
function runServer() {                                     //Purpose: Promise makes sure server starts before tests start.
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {                //need return?
    server = app.listen(port, () => {                      //starts server and listens to port just like in express apps
      console.log(`Your app is listening on port ${port}`);
      resolve(server);                                     //In promise, if console.log goes through test, resolve then actually runs server.
    }).on('error', err => {                                //If event returns error, run reject (part of Promise keywords)
      reject(err)                                          
    });
  });
}

// like `runServer`, this function also needs to return a promise.
// `server.close` does not return a promise on its own, so we manually
// create one.
function closeServer() {                                //Ran after CRUD tests??
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {                               //node.js: The server.close() method stops the HTTP server from accepting new connections.
      if (err) {                                        //With callback: Specifies a function to be executed after the server stops listening for connections
        reject(err);                                    //It will be called with an Error as its only argument if the server was not open when it was closed.
        // so we don't also call `resolve()`
        return;
      }
      resolve();                                        //resolve() is empty?
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {  //When a file is run directly from Node.js, require.main is set to its module. 
  //That means that it is possible to determine whether a file has been run directly by testing require.main === module. Ex. thru node server.js
  //When running npm test, mocha looks for .js file in test folder to run.
  runServer().catch(err => console.error(err)); //Under Promise instance, .catch runs if there was a reject in Promise (error)- since server already running??
  //if ran thru node, still be able to run test code thru ln 70.
  //When we open this file in order to import app and runServer in a test module, we don't want the server to automatically run, and this conditional block makes that possible.
};

module.exports = {app, runServer, closeServer};
