CREATE DATABASE db_erp_decor;

CREATE TABLE cliente(
    idCliente INT PRIMARY KEY AUTO_INCREMENT,
    nomeCliente VARCHAR(50)
)ENGINE=InnoDB;

CREATE TABLE familia_produto(
    id_familia_produto INT PRIMARY KEY AUTO_INCREMENT,
    nome_familia VARCHAR(50) NOT NULL
)ENGINE=InnoDB;

CREATE TABLE tipo_produto(
    id_tipo_produto INT PRIMARY KEY AUTO_INCREMENT,
    nome_tipo_produto VARCHAR(50) NOT NULL
)ENGINE=InnoDB;

CREATE TABLE produto (
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    nome_produto VARCHAR(150) NOT NULL,
    codigo_cliente VARCHAR(50),
    id_familia_produto INT NOT NULL,
    id_tipo_produto INT NOT NULL ,
    FOREIGN KEY (id_familia_produto) REFERENCES familia_produto(id_familia_produto), 
    FOREIGN KEY (id_tipo_produto) REFERENCES tipo_produto(id_tipo_produto)
)ENGINE=InnoDB;