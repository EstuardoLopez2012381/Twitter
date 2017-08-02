var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');

//Importar routes
var indexRoute = require('./routes/index');
var authRoute = require('./routes/auth.route');
var usuarioRoute = require('./routes/api/usuario.route');
var generoRoute = require('./routes/api/genero.route');
var postRoute = require('./routes/api/post.route');
var seguidorRoute = require('./routes/api/seguidor.route');
var comentarioRoute = require('./routes/api/comentario.route');
var services = require('./services');

var app = express();
var port = 3000;
var uri = '/api/v1/';

//confuguracion vista
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//configuracion logger
app.use(logger('dev'));

//configuaracion body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-Whit, Content-Type, Authorization');
  if(req.methods == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }

});


app.use('/', authRoute);
app.use('/', indexRoute);
app.use(uri, usuarioRoute);
app.use(uri, generoRoute);
app.use(uri, postRoute);
app.use(uri, seguidorRoute);
app.use(uri, comentarioRoute);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json(err);
  next();
});

app.listen(port, function() {
  console.log("El servidor esta  corriendo puerto: " + port)
});
