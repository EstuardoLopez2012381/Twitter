var express = require('express');
var genero = require('../../models/genero.model');
var router = express.Router();

router.get('/genero/', function(req, res) {
  genero.select(function(resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"mensaje" : "No hay generos"});
    }
  });
});

router.get('/genero/:idGenero',
  function(req, res, next) {
    var idGenero = req.params.idGenero;
    genero.find(idGenero,
      function(resultados){
      if(typeof resultados !== 'undefined') {
        res.json(resultados);
      } else {
        res.json({"mensaje": "No hay generos"});
      }
  });
});

router.post('/genero', function(req, res, next) {
  var data = {
    idGenero : null,
    nombreGenero: req.body.nombreGenero
  }
  genero.insert(data, function(resultado) {
    if(resultado && resultado.insertId > 0) {
      res.json({"mensaje": "Se ingreso el genero"});
    } else {
      res.json({"mensaje": "Se ingreso el genero"});
    }
  });
});

router.put('/genero/:idGenero', function(req, res, next) {

  var data = {
    idGenero : req.body.idGenero,
    nombreGenero: req.body.nombreGenero
  }

  genero.update(data, function(err, resultado) {
    if(resultado !== 'undefined') {
      res.json(resultado);
    } else {
      res.json({"mensaje": "No se modifico el genero"});
    }
  });
});

router.delete('/genero/:idGenero',
  function(req, res, next) {
    var idGenero = req.params.idGenero;
    genero.delete(idGenero,
      function(resultado){
      if(resultado && resultado.mensaje === "Eliminado") {
        res.json({"mensaje" : "Se elimino el genero"});
      } else {
        res.json({"mensaje": "No se puede eliminar"});
      }
  });
});


module.exports = router;
