var database = require('../config/database.config');
var Comentario = {};

Comentario.select = function(idPost, callback) {
  if(database) {
    var query = "SELECT comentario.idComentario, post.descripcion,  comentario.contenido, usuario.nombreUsuario FROM comentario INNER JOIN usuario ON comentario.idUsuario = usuario.idUsuario INNER JOIN post ON comentario.idPost = post.idPost WHERE post.idPost = ?;"
    database.query(query,
    idPost,
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(resultados);
        console.log(resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll



Comentario.insert = function(data, callback) {
  if(database) {
    database.query("INSERT INTO Comentario(idPost, idUsuario, contenido) VALUES(?,?,?)",
    [data.idPost, data.idUsuario, data.contenido],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"affectedRows": resultado.affectedRows});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Comentario.update = function(data, callback) {
  if(database) {
    var sql = "UPDATE Comentario SET "
    +"idPost = ?, contenido = ? WHERE idComentario = ?";
    database.query(sql,
    [data.idPost, data.contenido, data.idComentario],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Comentario.delete = function(idComentario, callback) {
  if(database) {
    var sql = "DELETE FROM Comentario WHERE idComentario = ?";
    database.query(sql, idComentario,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = Comentario;
