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
    { message: "E-email já cadastrado" }
}
//sucess
{
    { message: 'Cadastro realizado com sucesso' }
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
### **COBRANÇAS**

#### `POST` `/cobranca/cadastro/:id`

Essa é a rota que permite que uma cobrança seja cadastrada.

#### **Exemplo de requisição**
