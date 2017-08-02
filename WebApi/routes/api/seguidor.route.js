var express = require('express');
var seguidor = require('../../models/seguidor.model');
var services = require('../../services');
var router = express.Router();

router.get('/seguidor/', services.verificar, function(req, res, next) {
  var idUsuario = req.usuario.idUsuario;
    seguidor.select(idUsuario, function(resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"mensaje" : "No hay seguidores"});
      }
    })
});

router.post('/seguidor', services.verificar, function(req, res, next) {
  console.log("hola mundo");
  var data = {
    idUsuarioLog: req.usuario.idUsuario,
    idUsuario : req.body.idUsuario
  };
  seguidor.insert(data, function(resultado) {
    console.log(data);
    if(resultado && resultado.affectedRows > 0) {
      res.json({
        estado : true,
        mensaje : "Se agrego el seguidor"
      });
    } else {
      res.json({"mensaje": "No se ingreso la seguidor"});
    }
  });
});

router.put('/seguidor/:idSeguidor', function(req, res, next) {
  var idSeguidor = req.params.idSeguidor;
  var data = {
    idUsuarioLog: req.body.idUsuarioLog,
    idUsuario: req.body.idUsuario,
    idSeguidor : idSeguidor
  }
  seguidor.update(data, function(resultado) {
      if(resultado.length > 0) {
        res.json({
          estado : false,
          mensaje : "no se modifico"
        });
      } else {
        res.json({
          estado : true,
          mensaje : "Se modifico con exito"
        });
      }
    });
});

router.delete('/seguidor/:idSeguidor', function(req, res, next) {
    var idSeguidorUri = req.params.idSeguidor;
      seguidor.delete(idSeguidorUri, function(resultado){
        if(resultado && resultado.mensaje === "Eliminado") {
          res.json({
            estado : true,
            mensaje: "Seguidor eliminado"
          });
        } else {
          res.json({
            estado : false,
            mensaje: "Seguidor eliminado"
          });
        }
    });
});


module.exports = router;
