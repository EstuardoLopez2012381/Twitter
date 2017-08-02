var express = require('express');
var comentario = require('../../models/comentario.model');
var services = require('../../services');
var router = express.Router();

router.get('/comentarios/:idPost', services.verificar,
  function(req, res, next) {   
    var idPost = req.params.idPost;
    comentario.select(idPost, function(resultados){
      if(typeof resultados !== 'undefined') {
        res.json(resultados);
      } else {
        res.json({"mensaje": "No hay Comentarios"});
      }
  });
});

router.get('/comentario/:idComentario', services.verificar,
  function(req, res, next) {   
    var idComentario = req.body.idComentario;
    comentario.select(idComentario, function(resultados){
      if(typeof resultados !== 'undefined') {
        res.json(resultados);
      } else {
        res.json({"mensaje": "No hay Comentarios"});
      }
  });
});



router.post('/comentario', services.verificar, function(req, res, next) {
  var data = {
    idUsuario : req.usuario.idUsuario,
    idPost: req.body.idPost,
    contenido: req.body.contenido
  };
  comentario.insert(data, function(resultado) {
    if(resultado && resultado.affectedRows > 0) {
      res.json({
        estado : true,
        mensaje : "Se agrego el comentario"
      });
    } else {
      res.json({"mensaje": "No se ingreso la comentario"});
    }
  });
});

router.put('/comentario/:idComentario', function(req, res, next) {
  var idComentario = req.params.idComentario;
  var data = {
    idPost: req.body.idPost,
    contenido: req.body.contenido,
    idComentario : idComentario
  }
  comentario.update(data, function(resultado) {
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

router.delete('/comentario/:idComentario', function(req, res, next) {
    var idComentarioUri = req.params.idComentario;
      comentario.delete(idComentarioUri, function(resultado){
        if(resultado && resultado.mensaje === "Eliminado") {
          res.json({
            estado : true,
            mensaje: "Comentario eliminado"
          });
        } else {
          res.json({
            estado : false,
            mensaje: "Comentario eliminado"
          });
        }
    });
});


module.exports = router;
