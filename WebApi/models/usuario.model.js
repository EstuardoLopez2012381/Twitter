var database = require('../config/database.config');
var Usuario = {};


Usuario.login = function(data, callback) {
  if(database) {
    var consulta = 'SELECT * FROM Usuario WHERE nick = ? AND contrasena = ? LIMIT 1;';
    database.query(consulta, [data.nick, data.contrasena],
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        console.log(resultados[0])
        callback(resultados);
      }
    });
  }
}

Usuario.selectAll = function(callback) {
  if(database) {
    database.query('SELECT * FROM Usuario',  function(error, resultados) {
      if(error) throw error;
      callback(resultados);
    });
  }
}

Usuario.select = function(idUsuario, callback) {
  if(database) {
    var sql = "SELECT * FROM Usuario WHERE idUsuario = ?";
    database.query(sql, idUsuario,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado[0]);
      }
    });//Fin query
  }//Fin IF
}

Usuario.insert = function(data, callback) {
  if(database) {
    database.query("INSERT INTO Usuario SET ? ", data,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"affectedRows": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Usuario.update = function(data, callback) {
  if(database) {
    var sql = "UPDATE Usuario SET "
    +"nick = ?, contrasena = ? WHERE idUsuario = ?";
    database.query(sql,
    [data.nick, data.contrasena, data.nombreUsuario, data.correo, data.facebook, data.telefono, data.direccion, data.idUsuario],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(data);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Usuario.delete = function(idUsuario, callback) {
  if(database) {
    var sql = "DELETE FROM Usuario WHERE idUsuario = ?";
    database.query(sql, idUsuario,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

module.exports = Usuario;
