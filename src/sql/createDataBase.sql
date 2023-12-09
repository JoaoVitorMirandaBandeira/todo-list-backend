CREATE DATABASE todo_list;

CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR (255) NOT NULL,
    senha VARCHAR (255) NOT NULL
);

CREATE TABLE todos(
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    status BOOLEAN NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    userId VARCHAR(36),
    FOREIGN KEY (userId) REFERENCES users(id)
);