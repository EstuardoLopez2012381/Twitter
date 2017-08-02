var database = require('../config/database.config');
var Seguidor = {};

Seguidor.select = function(idUsuario, callback) {
  if(database) {
    var query = "SELECT usuario.idUsuario, usuario.nombreUsuario FROM Seguidor  INNER JOIN Usuario ON Usuario.idUsuario = Seguidor.idUsuario WHERE idUsuarioLog = ?;"
    database.query(query,
    idUsuario,
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



Seguidor.insert = function(data, callback) {
  if(database) {
    console.log(data);
    database.query("INSERT INTO Seguidor(idUsuarioLog, idUsuario) VALUES(?,?)",
    [data.idUsuarioLog, data.idUsuario],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"affectedRows": resultado.affectedRows});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Seguidor.update = function(data, callback) {
  if(database) {
    var sql = "UPDATE Seguidor SET "
    +"idUsuarioLog = ?, idUsuario = ? WHERE idSeguidor = ?";
    database.query(sql,
    [data.idUsuarioLog, data.idUsuario, data.idSeguidor],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Seguidor.delete = function(idSeguidor, callback) {
  console.log(idSeguidor);
  if(database) {
    var sql = "DELETE FROM Seguidor WHERE idSeguidor = ?";
    database.query(sql, idSeguidor,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = Seguidor;
