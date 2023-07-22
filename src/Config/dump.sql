Create database m05cobranca;

drop table if exists usuarios;

create table usuarios (
    id_usuario serial primary key,
    nome_usuario text not null,
    email text not null unique,
    senha text not null,
  	cpf NCHAR(11) UNIQUE,
    telefone NCHAR(11) 
);



drop table if exists clientes;

create table clientes (
    id_cliente serial primary key,
  	id_usuario integer references usuarios(id),
    nome_cliente text not null,
    email text not null unique,
    cpf NCHAR(11) UNIQUE NOT NULL,
    telefone NCHAR(11) NOT NULL,
    cep NCHAR(8),
    endereco text,
    complemento text,
    bairro text,
    cidade text,
    estado NCHAR(2),
  	status text default 'Em dia'
);

 update clientes from id_cliente set status = 'Inadimplentes';




drop table if exists cobrancas;

create table cobrancas(
    id_cobranca serial primary key,
  	id_usuario integer references usuarios(id),
  	id_cliente int references clientes(id) not null,
    descricao text ,
    valor bigint not null,
    vencimento date not null,
  	status text default 'Pendente'
);

update cobrancas set status = 'Vencida';

('Pendente'), ('Paga'),('Vencida');
