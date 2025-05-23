const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router); // Adding /api prefix to the routes

// Ensure the function is exported correctly
module.exports = (req, res) => {
  server(req, res);
};
