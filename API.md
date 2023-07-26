# Documentação da API para Integração

## URL da API

```javascript=
https://lazy-rose-moth-tam.cyclic.app/
```

## **Endpoints**

---

### **Cadastrar usuário**

#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "Isamara",
    "email": "isamara@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
//error
{
  {
    message: "E-email já cadastrado";
  }
}
//sucess
{
  {
    message: "Cadastro realizado com sucesso";
  }
}
```

---

### **Login do usuário**

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "isamara@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
//error
{
{ message: "E-mail ou senha inválidos" }
}


//sucess
{
    "usuario": {
        "id": 1,
        "nome": "Isamara",
        "email": "isamara@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

---

### **Atualizar Usuario**

#### `PUT` `/user/update`

Essa é a rota que permite o usuario cadastrado atualizar informações do próprio usuário.

#### **Exemplo de requisição**

```javascript
// PUT /user/update
{
    "email": "isamara123@email.com"
}
```

OU (qualquer outro campo)

```javascript
// PUT /user/update
{
    "nome": Isamara Pereira"
}
```

#### **Exemplos de resposta**

```javascript
//error
{
{ message: "Os campos nome e email são obrigatórios!" }
}

{
{message: "Para alterar a senha, as duas senhas têm que ser iguais"}
}

{
{message: "CPF já cadastrado para outro usuário!"}
}

{
{message: "Email já cadastrado para outro usuário!"}
}

{
{message: "Usuario sem sessao,redirecionar para pagina de login!"}
}

//sucess (usuario atualizado)
{
    "id_usuario": 30,
    "nome_usuario": "Isamara Peireira",
    "email": "isamara123@email.com",
    "senha": "$2b$10$lhwVc5uqq226psPiViVzneFzkYIhBTsLLWVj7SF72H5e43u7g.GNO",
    "cpf": "41241242549",
    "telefone": "1699999999 "
}
```

---

### **COBRANÇAS**

#### `POST` `/cobranca/cadastro/:id`

Essa é a rota que permite que uma cobrança seja cadastrada.

#### **Exemplo de requisição**
