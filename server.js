// create a server
const express = require('express');
const server = express();
const blogRouter = require('./data/blog-router');

server.use(express.json());

server.use('/api/posts', blogRouter); //router is mounted to this url path
server.use('/myapi/theposts', blogRouter); //mounting to a different url keeping the functionality of the router.
// server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  const {name = "user"} = req.query;
  
  res.send(`
    <h2>Lambda Blog Post API</h>
    <p>Welcome ${name} to the Lambda Blog Posts API</p>
  `);
});

module.exports = server;