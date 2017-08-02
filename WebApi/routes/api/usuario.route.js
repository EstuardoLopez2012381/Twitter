var express = require('express');
var usuario = require('../../models/usuario.model');
var services = require('../../services');
var router = express.Router();

router.get('/usuario', function(req, res) {
    usuario.selectAll(function(resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      }
      else {
        res.json({"mensaje" : "no hay usuarios"});
      }
    });
  });

  router.post('/usuario', function(req, res, next) {
    var data = {
      idUsuario : null,
      nick : req.body.nick,
      contrasena : req.body.contrasena,
      nombreUsuario : req.body.nombreUsuario,
      correo : req.body.correo,
      facebook : req.body.facebook,
      telefono : req.body.telefono,
      direccion : req.body.direccion
    }
    usuario.insert(data, function(resultado) {
      if (resultado && resultado.insertId > 0 ) {
        res.json({
          estado : true,
          mensaje : "se registro correctamente"
        });
      } else {
        res.json({
          estado : false,
          mensaje : "no se registro"
        });
      }
    });

  });

  router.put('/usuario/:idUsuario', function(req, res) {
    var idUsuario = req.params.idUsuario;

    var data = {
      idUsuario : req.body.idUsuario,
      nick : req.body.nick,
      pass : req.body.pass,
      nombreUsuario : req.body.nombreUsuario,
      correo : req.body.correo,
      facebook : req.body.facebook,
      telefono : req.body.telefono,
      direccion : req.body.direccion
    }
    console.log(data);

    if(idUsuario == data.idUsuario) {
      usuario.update(data, function(resultado) {
        if(typeof resultado !== undefined) {
          auth.cerrarSesion(res);
          res.json({"Editado":"true"})
        }
        else {
          res.json({"mensaje":"no se pudo actualizar"});
        }
      });
    }
    else {
        res.json({ mensaje : "no hay coherencia en los identificadores"});
    }
  });

  router.delete('/usuario/:idUsuario', function(req, res) {
    var idUsuario = req.params.idUsuario;
    usuario.delete(idUsuario, function(resultado) {
      if(resultado && resultado.mensaje == "Eliminado") {
        res.json({"mensaje":"Se elimino al usuario"});
      }
      else {
        res.json({"mensaje":"No se elimino al usuario"})
      }
    });
  });


module.exports = router;
