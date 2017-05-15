const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

const port = process.env.PORT || '3000';

const server = http.createServer(app);

server.listen(port, function() {
  console.log('Server running on port ' + port);
});
