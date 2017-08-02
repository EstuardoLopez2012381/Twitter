var database = require('../config/database.config');
var Post = {};

Post.select = function(idUsuario, callback) {
  if(database) {
    var query = "SELECT post.idPost, post.descripcion, usuario.nick FROM post INNER JOIN usuario ON post.idUsuario = usuario.idUsuario WHERE usuario.idUsuario = ?;"
    database.query(query,
    idUsuario,
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Post.selectAll = function(callback) {
  if(database) {
    database.query("SELECT post.idPost, post.descripcion, usuario.nick FROM post INNER JOIN usuario ON post.idUsuario = usuario.idUsuario;",
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Post.find = function(idPost, callback) {
  if(database) {
    var query = "SELECT * FROM Post WHERE idPost = idPost ;"
    database.query(query,
    idPost,
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(resultados);
      }
    });//Fin query
  }//Fin IF
}

Post.insert = function(data, callback) {
  if(database) {
    database.query("INSERT INTO Post(descripcion, idUsuario) VALUES(?,?)",
    [data.descripcion, data.idUsuario],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"affectedRows": resultado.affectedRows});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Post.update = function(data, callback) {
  if(database) {
    var sql = "UPDATE Post SET "
    +"descripcion = ?, idUsuario = ? WHERE idPost = ?";
    database.query(sql,
    [data.descripcion, data.idUsuario, data.idPost],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Post.delete = function(idPost, callback) {
  if(database) {
    var sql = "DELETE FROM Post WHERE idPost = ?";
    database.query(sql, idPost,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = Post;
