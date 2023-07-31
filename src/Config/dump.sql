Create database m05cobranca;

drop table if exists usuarios;

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome_usuario TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    cpf NCHAR(11) UNIQUE,
    telefone NCHAR(11)
);


drop table if exists clientes;

CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id_usuario),
    nome_cliente TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    telefone VARCHAR(11) NOT NULL,
    cep VARCHAR(8),
    endereco TEXT,
    complemento TEXT,
    bairro TEXT,
    cidade TEXT,
    estado VARCHAR(2),
    status TEXT DEFAULT 'Em dia'
);

 update clientes from id_cliente set status = 'Inadimplente';




drop table if exists cobrancas;

CREATE TABLE cobrancas (
    id_cobranca SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id_usuario),
    id_cliente INTEGER REFERENCES clientes(id_cliente) NOT NULL,
    descricao TEXT NOT NULL,
    valor BIGINT NOT NULL,
    vencimento DATE NOT NULL,
    status TEXT DEFAULT 'Pendente'
);

update cobrancas set status = 'Vencida';

('Pendente'), ('Paga'),('Vencida');
