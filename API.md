# Documentação da API para Integração

## URL da API

```javascript=
https://lazy-rose-moth-tam.cyclic.app/
```

## **Endpoints**

### **Usuários**
<details>
<summary><b>Cadastrar usuário</b></summary>

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
//erros de campos
{
  {
    message: "O campo nome é obrigatório";
  }
 {
    message: "O campo e-mail é obrigatório";
  }
 {
    message: "E-mail inválido";
  }
 {
    message: "O campo senha é obrigatório";
  }
}

//error
{
 {
    message: "E-mail já cadastrado"
 {
}

//sucess
{
  {
    messageSucess: "Cadastro realizado com sucesso";
  }
}
```
</details>

<details>
<summary><b>Login do usuário</b></summary>

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email":"pedroteste@email.com",
	"senha":"141412"
}
```

#### **Exemplos de resposta**

```javascript
//erros de campo
{
 {
    message: "O campo e-mail é obrigatório";
  }
 {
    message: "E-mail inválido";
  }
 {
    message: "O campo senha é obrigatório";
  }
}

//error 
{
   { message: "E-mail ou senha inválidos" }
}

//sucess
{
    "user":
    {
		"id_usuario": 65,
		"nome_usuario": "pedro teste",
		"email": "pedroteste@email.com",
		"cpf": "12345678095",
		"telefone": null
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsImlhdCI6MTY5MDQ2NzQ4MSwiZXhwIjoxNjkwNDk2MjgxfQ.dvPdf3Q8UcRzLP0kbP7EExMJXFeIdAc-GNhafWU3yhk"
}
}
```
</details>

<details>
<summary><b>Listar usuário</b></summary>

#### `GET` `/usuario`

Essa é a rota que permite o usuario liste as informações do usuário.

```javascript
// GET /usuario
```

#### **Exemplos de resposta**

```javascript
//error
{
   message: "Usuário não encontrado"
}

//sucess
{
   "id_usuario": 50,
   "nome_usuario": "camila borges",
   "email": "shdga@gmail.com",
   "senha": "$2b$10$GqxtE1nvqOf1S50q8ujKEOVcXaViWGi2LUvJrB9JGcvAXLVqU/4qa",
   "cpf": null,
   "telefone": null
}
```
</details>

<details>
<summary><b>Atualizar Usuário</b></summary>

Essa rota permite que o usuário atualize qualquer campo.

#### **Exemplo de requisição**

```javascript
// PUT /usuario/atualizar
{
    "email": "xa@email.com"
}
//header
{
  authorization: "Bearer 
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImlhdCI6MTY5MDM5NjU4MCwiZXhwIjoxNjkwNDI1MzgwfQ.VXkavI1cMazLya4cGZIlALS7WeCvD019QnQcFCd19W4"
}
```
OU (qualquer outro campo)

```javascript
// PUT /usuario/atualizar
{
    "nome":"camila bors"
}
//header
{
  authorization: "Bearer 
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImlhdCI6MTY5MDM5NjU4MCwiZXhwIjoxNjkwNDI1MzgwfQ.VXkavI1cMazLya4cGZIlALS7WeCvD019QnQcFCd19W4"
}
```

#### **Exemplos de resposta**

```javascript
//error 
{
  { message: "E-mail já cadastrado" }
}

{
   { message: "E-mail do usuário" }
}

{
   { message: "CPF já cadastrado para outro usuário!" }
}

{
   { message: "CPF incorreto" }
}

{
   { message: "CPF do usuário" }
}

{
   { message: 'Telefone inválido' }
}


//sucess (usuario atualizado)
{
   { message: 'Usuário atualizado com sucesso' }
}
```
</details>

---

### **Cobranças**

<details>
<summary><b>Cadastrar Cobranças</b></summary>

#### `POST` `/cobranca/cadastro/:id`

Essa é a rota que permite que uma cobrança seja cadastrada.

#### **Exemplo de requisição**
