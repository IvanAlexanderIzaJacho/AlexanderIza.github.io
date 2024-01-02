create database BufetAbogado;
use BufetAbogado;
-- TABLA CLIENTE
create table Cliente(
	idCliente int auto_increment not null primary key ,
    dniCliente varchar(45) not null,
    apellidoCliente varchar(40) not null,
    nombreCliente varchar(40) not null,
    direccionCliente varchar(50) not null,
    edadCliente int not null
);
select *from Cliente;