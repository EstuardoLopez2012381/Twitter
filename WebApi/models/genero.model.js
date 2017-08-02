var database = require('../config/database.config');
var Genero = {};

Genero.select = function(callback) {
  if(database) {
    database.query("SELECT * FROM Genero",
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Genero.find = function(idGenero, callback) {
  if(database) {
    var sql = "SELECT * FROM Genero WHERE idGenero = ?";
    database.query(sql, idGenero,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Genero.insert = function(data, callback) {
  if(database) {
    database.query("INSERT INTO Genero SET ? ", data,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Genero.update = function(data, callback) {
  if(database) {
    var sql = "UPDATE Genero SET nombreGenero = ? WHERE idGenero = ?";
    database.query(sql,
    [data.nombreGenero, data.idGenero],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(data);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Genero.delete = function(idGenero, callback) {
  if(database) {
    var sql = "DELETE FROM Genero WHERE idGenero = ?";
    database.query(sql, idGenero,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = Genero;
