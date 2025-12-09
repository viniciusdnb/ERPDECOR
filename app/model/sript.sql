CREATE DATABASE db_erp_decor;

CREATE TABLE cliente(
    idCliente INT PRIMARY KEY AUTO_INCREMENT,
    nomeCliente VARCHAR(50)
)ENGINE=InnoDB;

CREATE TABLE familia_produto(
    id_familia INT PRIMARY KEY AUTO_INCREMENT,
    nome_familia VARCHAR(50) NOT NULL
)ENGINE=InnoDB;

CREATE TABLE tipo_produto(
    id_tipo INT PRIMARY KEY AUTO_INCREMENT,
    nome_tipo_produto VARCHAR(50) NOT NULL
)ENGINE=InnoDB;

CREATE TABLE produto (
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    nome_produto VARCHAR(150) NOT NULL,
    codigo_cliente VARCHAR(50)   
)ENGINE=InnoDB;

CREATE TABLE produto_x_familia (
    id_familia_produto INT PRIMARY KEY AUTO_INCREMENT,
    id_familia INT NOT NULL,
    id_tipo INT NOT NULL,
    ativo BOOLEAN,
    createdAt DATE
    updateAt DATE,
    FOREIGN KEY (id_familia) REFERENCES familia_produto(id_familia), 
    FOREIGN KEY (id_tipo) REFERENCES tipo_produto(id_tipo)
)ENGINE=InnoDB;

