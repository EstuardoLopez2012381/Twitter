CREATE DATABASE Twitter;
USE Twitter;

CREATE TABLE Usuario(
	idUsuario INT AUTO_INCREMENT NOT NULL,
    nick VARCHAR(25) NOT NULL,
    contrasena VARCHAR(25) NOT NULL,
    nombreUsuario VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    facebook VARCHAR(100) NULL,
    telefono VARCHAR(15) NULL,
    direccion VARCHAR(100) NULL,
    PRIMARY KEY(idUsuario)
);

CREATE TABLE Seguidor(
	idSeguidor INT AUTO_INCREMENT NOT NULL,
    idUsuarioLog INT NOT NULL,
    idUsuario INT NOT NULL,
    PRIMARY KEY(idSeguidor),
    FOREIGN KEY(idUsuarioLog) REFERENCES Usuario(idUsuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY(idUsuario) REFERENCES Usuario(idUsuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Genero(
	idGenero INT AUTO_INCREMENT NOT NULL,
    nombreGenero VARCHAR(50) NOT NULL,
    PRIMARY KEY(idGenero)
);

CREATE TABLE Post(
	idPost INT AUTO_INCREMENT NOT NULL,
    descripcion TEXT NOT NULL,
    idUsuario INT NOT NULL,
    PRIMARY KEY(idPost),
    FOREIGN KEY(idUsuario) REFERENCES Usuario(idUsuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Comentario(
	idComentario INT AUTO_INCREMENT NOT NULL,
    idPost INT NOT NULL,
    idUsuario INT NOT NULL,
    Contenido TEXT NOT NULL,
    PRIMARY KEY(idComentario),
    FOREIGN KEY(idPost) REFERENCES Post(idPost)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY(idUsuario) REFERENCES Usuario(idUsuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);