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
    message: "Cadastro realizado com sucesso";
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

#### `PUT` `/usuario/atualizar`

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
<summary><b>Cadastrar Cobrança</b></summary>

#### `POST` `/cobranca/cadastro/:id`

Essa é a rota que permite que uma cobrança seja cadastrada.

#### **Exemplo de requisição**

```javascript
// POST /cobranca/cadastro/:id
{
   "descricao": "notebook",
   "valor": 3000,
   "vencimento": "20/09/2023",
   "status": "Em dia"
}
//header
{
  authorization: "Bearer 
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImlhdCI6MTY5MDM5NjU4MCwiZXhwIjoxNjkwNDI1MzgwfQ.VXkavI1cMazLya4cGZIlALS7WeCvD019QnQcFCd19W4"
}
```

#### **Exemplos de resposta**

```javascript
//erros de campo
{
  { message: "Este campo deve ser preenchido" }
}

//error
{
  { message: 'Cliente não encontrado' }
}
{
  { message: 'Cobrança não foi cadastrada' }
}
//sucess
{
  { message: 'Cobrança cadastrada com sucesso' }
}
```
</details>

<details>
<summary><b>Editar Cobrança</b></summary>

#### `PUT` `/cobranca/editar/:id`

Essa é a rota que permite que uma cobrança seja editada.

#### **Exemplo de requisição**

```javascript
// PUT /cobranca/editar/:id
{
 { "descricao": "notebook samsung" }
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
  { message: 'Cobrança não cadastrada' }
}
{
  { message: 'Cobrança não foi alterada' }
}
//sucess
{
  { message: 'Cobrança alterada com sucesso!' }
}
```
</details>

<details>
<summary><b>Listar Cobrança</b></summary>

#### `GET` `/cobranca`

Essa é a rota que permite listar todas as cobranças.

#### **Exemplo de requisição**

```javascript
// GET /cobranca
//header
{
  authorization: "Bearer 
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImlhdCI6MTY5MDM5NjU4MCwiZXhwIjoxNjkwNDI1MzgwfQ.VXkavI1cMazLya4cGZIlALS7WeCvD019QnQcFCd19W4"
}
```

#### **Exemplos de resposta**

```javascript
//error
//sucess
```
</details>

<details>
<summary><b>Deletar Cobrança</b></summary>

#### `DELETE` `/cobranca/:id`

Essa é a rota que permite deletar uma cobrança.

#### **Exemplo de requisição**

```javascript
// DELETE /cobranca/:id
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
  { message: 'Cobrança não existe' }
}
{
  { message: 'Cobrança vencida não poderá ser excluída' }
}
{
  { message: 'Cobrança paga não pode ser excluída' }
}
{
  { message: 'Esta cobrança não pode ser excluida' }
}
//sucess
{
  { message: 'Cobrança excluída com sucesso!' }
}
```
</details>

---

 ### **Clientes**

<details>
<summary><b>Cadastrar Cliente</b></summary>

#### `POST` `/cliente`

Essa é a rota que permite que cadastre um cliente.

#### **Exemplo de requisição**

```javascript
// POST /cliente
{
  "nome": "BKing",
  "email": "ryander@b4k.com.br",
  "cpf": 12345678990,
  "telefone": 999999999
  "cep": 11111222
 "status": "Em dia"
}
```

#### **Exemplos de resposta**

```javascript
//erros de campo
{
  { message: "Nome deve ser preenchido" }
}
{
  { message: "Nome é obrigatório" }
}
{
  { message: "E-mail deve ser preenchido" }
}
{
  { message: "E-mail é obrigatório" }
}
{
  { message: "E-mail inválido" }
}
{
  { message: "CPF deve ser preenchido" }
}
{
  { message: "CPF é obrigatório" }
}
{
  { message: "Telefone deve ser preenchido" }
}
{
  { message: "Telefone é obrigatório" }
}
{
  { message: "Informe um cep válido" }
}
{
  { message: "E-email já cadastrado!" }
}
{
  { message: "CPF já cadastrado!" }
}
{
  { message: "Não foi possivel adicionar o cliente!" }
}
//sucess
{
  { message: "Cliente adicionado com sucesso!" }
}
```
<details/>

<details>
<summary><b>Editar Cliente</b></summary>

#### `PUT` `/cliente/:id`

Essa é a rota que permite que atualize o clinte.

#### **Exemplo de requisição**

```javascript
// PUT /cliente/:id
{

}
```

#### **Exemplos de resposta**

```javascript
//error
//sucess
```

<details/>
	
<details>
<summary><b>Detalhar Cliente</b></summary>

#### `POST` `/cliente/:id`

Essa é a rota que permite que cadastre um cliente.

#### **Exemplo de requisição**

```javascript
// POST /cliente/:id

```

#### **Exemplos de resposta**

```javascript
//error
{
  { message: "Cliente não encontrado!" }
}
//sucess
{
  "id_client": 1,
  "id_usuario": 1,
  "nome_cliente": "ryander",
  "email": "joaosilva@email.com",
  "cpf": 12345678901
  "telefone": 11987654321,
  "cep": 05428200,
  "endereco": "Rua Amor Perfeito, 123",
  "complemento": "Apto 202", 
  "bairro": "ViLa Mariana",
  "cidade": "São Paulo",
  "estado": "SP",
  "status": "Em dia"
}
```
<details/>

<details>
<summary><b>Listar Cliente</b></summary>

#### `GET` `/cliente/:id`

Essa é a rota que permite.

#### **Exemplo de requisição**

```javascript
// GET /cliente/:id

```

#### **Exemplos de resposta**

```javascript
//error
//sucess
```

</details>
