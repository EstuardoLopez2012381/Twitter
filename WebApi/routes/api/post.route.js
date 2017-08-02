var express = require('express');
var post = require('../../models/post.model');
var services = require('../../services');
var router = express.Router();

router.get('/posts/:idUsuario', services.verificar, 
  function(req, res, next) {
  var idUsuario = req.params.idUsuario;
  console.log(idUsuario);
    post.select(idUsuario, function(resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"mensaje" : "No hay posts"});
      }
    })
});

router.get('/post/', function(req, res) {
  post.selectAll(function(resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"mensaje" : "No hay post"});
    }
  });
});

router.get('/post/:idPost', services.verificar,
  function(req, res, next) {
    var idPost = req.params.idPost;
    post.select(idUsuario, function(resultados){
      if(typeof resultados !== 'undefined') {
        res.json(resultados);
      } else {
        res.json({"mensaje": "No hay posts"});
      }
  });
});

router.post('/post', services.verificar, function(req, res, next) {
  var data = {
    idUsuario : req.usuario.idUsuario,
    descripcion: req.body.descripcion
  };
  console.log(data);
  post.insert(data, function(resultado) {
    if(resultado && resultado.affectedRows > 0) {
      res.json({
        estado : true,
        mensaje : "Se agrego el post"
      });
    } else {
      res.json({"mensaje": "No se ingreso el post"});
    }
  });
});

router.put('/post/:idPost', function(req, res, next) {
  var idPost = req.params.idPost;
  var data = {
    nombrePost: req.body.nombrePost,
    descripcion: req.body.descripcion,
    idPost : idPost
  }
  post.update(data, function(resultado) {
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

router.delete('/post/:idPost', function(req, res, next) {
    var idPostUri = req.params.idPost;
      post.delete(idPostUri, function(resultado){
        if(resultado && resultado.mensaje === "Eliminado") {
          res.json({
            estado : true,
            mensaje: "Post eliminado"
          });
        } else {
          res.json({
            estado : false,
            mensaje: "Post eliminado"
          });
        }
    });
});


module.exports = router;
