# Documentação da API para Integração

## URL da API

```javascript=
https://lazy-rose-moth-tam.cyclic.app/
```
<details>
<summary>1° Sprint</summary>

### **Usuários**
<details>
<summary><b>Cadastrar usuário</b></summary>

#### `POST` `/usuario`

Esta é a rota que será utilizada para cadastrar um novo usuário no sistema.

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
  { message: "O campo nome é obrigatório"; }
  
  { message: "O campo nome é inválido"; }
 
  { message: "O campo e-mail é obrigatório"; }
 
  { message: "E-mail inválido"; }
 
  { message: "O campo senha é obrigatório"; }
}

//error
{
  { message: "E-mail já cadastrado" }

  { message: "A senha deve ter no minimo 6 digitos" }
}

//sucess
{
  { message: "Cadastro realizado com sucesso"; }
}
```
</details>

<details>
<summary><b>Login do usuário</b></summary>

#### `POST` `/login`

Esta é a rota que permite o usuário cadastrado realizar o login no sistema.

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
 { message: "O campo e-mail é obrigatório" }
 
 { message: "E-mail inválido" }

 { message: "O campo senha é obrigatório"}
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
		"nome_usuario": "pedro teste"
	   },
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsImlhdCI6MTY5MDQ2NzQ4MSwiZXhwIjoxNjkwNDk2MjgxfQ.dvPdf3Q8UcRzLP0kbP7EExMJXFeIdAc-GNhafWU3yhk"

}
```
</details>

<details>
<summary><b>Listar usuário</b></summary>

#### `GET` `/usuario`

Esta é a rota com informações do usuário.

```javascript
// GET /usuario
{
  headers: {        
    authorization: token,
  }
}
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

//error
{
  { message: "Não autorizado" }
}
```
</details>

<details>
<summary><b>Atualizar Usuário</b></summary>

#### `PUT` `/usuario/atualizar`

Esta rota permite que o usuário atualize qualquer campo.

#### **Exemplo de requisição**

```javascript
// PUT /usuario/atualizar
{
    "email": "xa@email.com"
}
//header
{
  headers: {        
    authorization: token,
  }
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
  headers: {        
    authorization: token,
  }
}
```

#### **Exemplos de resposta**

```javascript
//error 
{
 { message: "Não autorizado"}

 { message: "Digite um CPF válido!" }

 { message: "Nome e email são campos obrigatórios." }

 { message: "Nome inválido" }

 { message: "E-mail já cadastrado para outro usuário." }

 { message: "CPF já cadastrado para outro usuário." }

 { message: "As senha não correspondem." }

 { message: "A senha deve ter no minimo 6 digitos" }

 { message: "Senha atual incorreta!" }

 { message: "Digite a senha Atual!" }

 { message: "Telefone inválido" }

 { error: "Ocorreu um erro ao atualizar os dados do usuário." }
}

//sucess (usuario atualizado)
{
 { message: "Dados atualizados com sucesso." }
}
```
</details>


### **Cobranças**

<details>
<summary><b>Cobranças Valor Total</b></summary>


#### `GET` `/cobranca/total`

Esta rota retorna o valor total de cada cobrança.

#### **Exemplo de requisição**

```javascript
//header
{
  headers: {        
    authorization: token,
  }
}
```

#### **Exemplos de resposta**

```javascript
//error 
{
 { message: "Não autorizado"}
}

//sucess 
{
	"Pagas": "11000",
	"Pendentes": "10000",
	"Vencidas": "298000"
}
```
</details>

<details>
<summary><b>Cobranças Home Cards</b></summary>

#### `GET` `/usuario/painel`

Essa é a rota que lista todos os tipos de cobrança.

#### **Exemplo de requisição**

```javascript

//header
{
  headers: {        
    authorization: token,
  }
}
```

#### **Exemplos de resposta**

```javascript
//error
{
  { message: "Não autorizado" }
}

//sucess
{
  "nome_usuario": "jaobobbbo",
	"Pagas": [
		{
			"id_cobranca": 24,
			"id_usuario": null,
			"id_cliente": 1,
			"descricao": "boleto",
			"valor": "1000",
			"vencimento": "2023-07-22T03:00:00.000Z",
			"status": "Paga",
			"nome_cliente": "bbraao"
		},
		{
			"id_cobranca": 25,
			"id_usuario": null,
			"id_cliente": 1,
			"descricao": "boleto",
			"valor": "1000",
			"vencimento": "2023-07-22T03:00:00.000Z",
			"status": "Paga",
			"nome_cliente": "bbraao"
		},
		{
			"id_cobranca": 26,
			"id_usuario": null,
			"id_cliente": 1,
			"descricao": "boleto",
			"valor": "1000",
			"vencimento": "2023-07-22T03:00:00.000Z",
			"status": "Paga",
			"nome_cliente": "bbraao"
		},
		{
			"id_cobranca": 5,
			"id_usuario": null,
			"id_cliente": 1,
			"descricao": "boleto",
			"valor": "1000",
			"vencimento": "2023-07-30T03:00:00.000Z",
			"status": "Paga",
			"nome_cliente": "bbraao"
		}
	],
	"Pendentes": [
		{
			"id_cobranca": 1,
			"id_usuario": null,
			"id_cliente": 1,
			"descricao": "boleto",
			"valor": "1000",
			"vencimento": "2023-07-29T03:00:00.000Z",
			"status": "Pendente",
			"nome_cliente": "bbraao"
		},
		{
			"id_cobranca": 12,
			"id_usuario": null,
			"id_cliente": 1,
			"descricao": "boleto",
			"valor": "1000",
			"vencimento": "2023-07-29T03:00:00.000Z",
			"status": "Pendente",
			"nome_cliente": "bbraao"
		},
		{
			"id_cobranca": 11,
			"id_usuario": null,
			"id_cliente": 1,
			"descricao": "boleto",
			"valor": "1000",
			"vencimento": "2023-07-29T03:00:00.000Z",
			"status": "Pendente",
			"nome_cliente": "bbraao"
		},
		{
			"id_cobranca": 7,
			"id_usuario": null,
			"id_cliente": 1,
			"descricao": "boleto",
			"valor": "1000",
			"vencimento": "2023-07-29T03:00:00.000Z",
			"status": "Pendente",
			"nome_cliente": "bbraao"
		}
	],
	"Vencidas": [
		{
			"id_cobranca": 8,
			"id_usuario": null,
			"id_cliente": 1,
			"descricao": "boleto",
			"valor": "1000",
			"vencimento": "2023-07-24T03:00:00.000Z",
			"status": "Vencida",
			"nome_cliente": "bbraao"
		},
		{
			"id_cobranca": 22,
			"id_usuario": null,
			"id_cliente": 1,
			"descricao": "boleto",
			"valor": "1000",
			"vencimento": "2023-07-22T03:00:00.000Z",
			"status": "Vencida",
			"nome_cliente": "bbraao"
		},
		{
			"id_cobranca": 23,
			"id_usuario": null,
			"id_cliente": 1,
			"descricao": "boleto",
			"valor": "1000",
			"vencimento": "2023-07-22T03:00:00.000Z",
			"status": "Vencida",
			"nome_cliente": "bbraao"
		},
		{
			"id_cobranca": 2,
			"id_usuario": null,
			"id_cliente": 1,
			"descricao": "boleto",
			"valor": "1000",
			"vencimento": "2023-07-24T03:00:00.000Z",
			"status": "Vencida",
			"nome_cliente": "bbraao"
		}
	],
	"qtdRegistroVencidas": [
		{
			"count": "17"
		}
	],
	"qtdRegistroPendentes": [
		{
			"count": "5"
		}
	],
	"qtdRegistroPagas": [
		{
			"count": "5"
		}
	],
	"totalValorVencidas": [
		{
			"sum": "294000"
		}
	],
	"totalValorPendentes": [
		{
			"sum": "14000"
		}
	],
	"totalValorPagas": [
		{
			"sum": "11000"
		}
	],
	"totalEmdias": {
		"clientInDay": [
			{
				"id_cliente": 41,
				"cliente": "Pedro",
				"cpf": "45437212097"
			},
			{
				"id_cliente": 40,
				"cliente": "camila",
				"cpf": "11111133333"
			},
			{
				"id_cliente": 39,
				"cliente": "miguelhenri",
				"cpf": "06334693190"
			},
			{
				"id_cliente": 38,
				"cliente": "joazinho",
				"cpf": "14141414141"
			}
		],
		"total": "36"
	},
	"totalInadimplentes": {
		"clientDefaulters": [
			{
				"id_cliente": 29,
				"cliente": "Sandra dos Santos",
				"cpf": "78691026529"
			},
			{
				"id_cliente": 9,
				"cliente": "status3",
				"cpf": "12345218992"
			},
			{
				"id_cliente": 8,
				"cliente": "status3",
				"cpf": "12345318992"
			},
			{
				"id_cliente": 7,
				"cliente": "status2",
				"cpf": "12345318932"
			}
		],
		"total": "4"
	}
}
```
</details>

 ### **Clientes**

<details>
<summary><b>Cadastrar Cliente</b></summary>

#### `POST` `/cliente`

Esta é a rota que permite o usuário cadastrar um cliente.

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
//headers
{
  headers: {        
    authorization: token,
  }
}
```

#### **Exemplos de resposta**

```javascript
//error
{
  { message: "Não autorizado" }
  { message: "Nome deve ser preenchido" }
  { message: "Nome é obrigatório" }
  { message: "E-mail deve ser preenchido" }
  { message: "E-mail é obrigatório" }
  { message: "E-mail inválido" }
  { message: "CPF deve se preenchido" }
  { message: "CPF é obrigatório" }
  { message: "Telefone deve ser preenchido" }
  { message: "Telefone é obrigatório" }
  { message: "O telefone deve no mínimo 10 caracteres" }
  { message: "O telefone deve ter no máximo 11 caracteres" }
  { message: "Informe um cep válido" }
  { message: "Informe uma cidade válida" }
  { message: "Informe um estado válido" }
  { message: "Status inválido" }
  { message: "Digite um CPF válido!" }
  { message: "E-email já cadastrado!" }
  { message: "CPF já cadastrado!" }
  { message: "Não foi possivel adicionar o cliente!" }
}

//sucess
{
  { message: "Cliente adicionado com sucesso!" }
}
```
</details>

---
</details>


<details>
<summary>2° Sprint</summary>

### **Cliente** 

<details>
<summary><b>Listar Clientes</b></summary>

#### `GET` `/cliente`

Estaa é a rota que permite listar todos os clientes cadastrados.

#### **Exemplo de requisição**

```javascript
// GET /cliente
{
  headers: {        
    authorization: token,
  }
}

```

#### **Exemplos de resposta**

```javascript
//error
{
  { message: "Não autorizado"}
}
//sucess
[
  {
		"id_cliente": 48,
		"id_usuario": 80,
		"nome_cliente": "Carlos Eduardo",
		"email": "carlos@yahoo.com.br",
		"cpf": "91624929508",
		"telefone": "8432782902",
		"cep": "77019431",
		"endereco": "Quadra ARSO 121 Alameda 26",
		"complemento": "Casa",
		"bairro": "Plano Diretor Sul",
		"cidade": "Palmas",
		"estado": "TO",
		"status": "Em dia"
	},
	{
		"id_cliente": 47,
		"id_usuario": 124,
		"nome_cliente": "joaozinhodabala",
		"email": "joazinhala@email.com",
		"cpf": "15985557820",
		"telefone": "16999283476",
		"cep": null,
		"endereco": null,
		"complemento": null,
		"bairro": null,
		"cidade": null,
		"estado": null,
		"status": "Em dia"
	},
	{
		"id_cliente": 46,
		"id_usuario": 124,
		"nome_cliente": "joaozinhodabala",
		"email": "joazinhodabala@email.com",
		"cpf": "46166694814",
		"telefone": "16999283476",
		"cep": null,
		"endereco": null,
		"complemento": null,
		"bairro": null,
		"cidade": null,
		"estado": null,
		"status": "Em dia"
	}
]
```
</details>

<details>
<summary><b>Detalhar Cliente</b></summary>

#### `GET` `/cliente/:id`

Essa é a rota que retorna informações de um cliente.

#### **Exemplo de requisição**

```javascript
// GET /cliente/:id
```

#### **Exemplos de resposta**

```javascript
//error
{
  { message: "Cliente não encontrado!" }
}
//**sucess**
"client": [
		{
			"id_cliente": 48,
			"id_usuario": 80,
			"nome_cliente": "Carlos Eduardo",
			"email": "carlos@yahoo.com.br",
			"cpf": "91624929508",
			"telefone": "8432782902",
			"cep": "77019431",
			"endereco": "Quadra ARSO 121 Alameda 26",
			"complemento": "Casa",
			"bairro": "Plano Diretor Sul",
			"cidade": "Palmas",
			"estado": "TO",
			"status": "Em dia"
		}
	],
	"billing": []
```
</details>

<details>
<summary><b>Editar Cliente</b></summary>

#### `PUT` `/cliente/:id`

Esta é a rota que permite que atualize os dados do cliente.

#### **Exemplo de requisição**

```javascript
// PUT /cliente/:id
{
 "nome": "Robinho"
}
```

#### **Exemplos de resposta**

```javascript
//error
{
  { message: "Nome deve ser preenchido" }
  { message: "Nome é obrigatório" }
  { message: "E-mail deve ser preenchido" }
  { message: "E-mail é obrigatório" }
  { message: "E-mail inválido" }
  { message: "CPF deve ser preenchido" }
  { message: "CPF é obrigatório" }
  { message: "Telefone deve ser preenchido" }
  { message: "Telefone é obrigatório" }
  { message: "O telefone deve no mínimo 10 caracteres" }
  { message: "O telefone deve ter no máximo 11 caracteres" }
  { message: "Informe um cep válido" }
  { message: "Informe uma cidade válida" }
  { message: "Informe um estado válido" }
  { message: "Status inválido" }
  { message: "Digite um CPF válido!" }
  { message: "E-email já cadastrado!" }
  { message: "CPF já cadastrado!" }
}
//sucess
{
  { message: "Cliente atualizado com sucesso!" }
}
```
</details>

### **Cobranças**

<details>
<summary><b>Cadastrar Cobrança</b></summary>

#### `POST` `/cobranca/cadastro/:id`

Esta é a rota que permite cadastrar uma cobrança.

#### **Exemplo de requisição**

```javascript
// POST /cobranca/cadastro/:id
{
 "descricao": "cobrança",
 "valor": 2000,
 "vencimento": "31/09/2023",
 "status": "Em dia"
}
```

#### **Exemplos de resposta**

```javascript
//error
{
 { message: "Este campo deve ser preenchido" }

 { message: 'Cliente não encontrado' }
 
 { message: 'Cobrança não foi cadastrada' }
}
//sucess
{
  { message: 'Cobrança cadastrada com sucesso' }
}
```
</details>

<details>
<summary><b>Listar Cobrança</b></summary>

#### `GET` `/cobranca`

Esta é a rota que permite listar todas as cobranças.

#### **Exemplo de requisição**

```javascript
// GET /cobranca
{
  "status": "Vencida",
  "data": "28/10/2024",
  "cliente": "Robinho",
  "id": 87
}
//header
{
  headers: {        
    authorization: token,
  }
}

```

#### **Exemplos de resposta**

```javascript
//error
{
  { message: "Não autorizado"}
}
//sucess
{
{
		"id_cobranca": 7,
		"id_usuario": null,
		"id_cliente": 1,
		"descricao": "boleto",
		"valor": "1000",
		"vencimento": "2023-07-29T03:00:00.000Z",
		"status": "Vencida",
		"cliente": "bbraao"
	},
	{
		"id_cobranca": 22,
		"id_usuario": null,
		"id_cliente": 1,
		"descricao": "boleto",
		"valor": "1000",
		"vencimento": "2023-07-22T03:00:00.000Z",
		"status": "Vencida",
		"cliente": "bbraao"
	},
	{
		"id_cobranca": 23,
		"id_usuario": null,
		"id_cliente": 1,
		"descricao": "boleto",
		"valor": "1000",
		"vencimento": "2023-07-22T03:00:00.000Z",
		"status": "Vencida",
		"cliente": "bbraao"
	}
}
```
</details>

---
</details>


<details>
<summary>3° Sprint</summary>

### **Cobrança** 

<details>

<summary>3° Sprint</summary>

### **Cobrança** 

<details>

<summary><b>Editar Cobrança</b></summary>

#### `PUT` `/cobranca/editar/:id`

Esta é a rota que permite editar uma cobrança.

#### **Exemplo de requisição**

```javascript
// PUT /cobranca/editar/:id
{
 "valor": 3000
}

```

#### **Exemplos de resposta**

```javascript
//error
{
  { message: "Este campo deve ser preenchido" }
  { message: "Cobrança não cadastrada" }
  { message: 'Cobrança não foi alterada' }
}
//sucess
{
  { message: 'Cobrança alterada com sucesso!' }
}
```
</details>

<details>
<summary><b>Excluir Cobrança</b></summary>

#### `DELETE` `/cobranca/delete/:id`

Esta é a rota que permite excluir uma cobrança.

#### **Exemplo de requisição**

```javascript
// DELETE /cobranca/delete/:id
//header
{
  headers: {        
    authorization: token,
  }
}
```

#### **Exemplos de resposta**

```javascript
//error
{
  { message: "Não autorizado" }
  { message: "token expirado" }
  { message: "Cobrança não existe" }
  { message: "Cobrança vencida não podera ser excluida" }
  { message: "Cobrança paga não pode ser excluída" }
  { message: "Esta cobrança não pode ser excluida" }
}

//sucess
{
  { message: "Cobrança excluída com sucesso!" }
}
```
</details>

<details>

<summary><b>Detalhar Cobrança</b></summary>

#### `GET` `/cobranca/:id`

Esta é a rota que permite detalhar uma cobrança.

#### **Exemplo de requisição**

```javascript
// GET /cobranca/:id
```

#### **Exemplos de resposta**

```javascript
//error
{
  { message: 'Cobrança não existe' }
  { message: 'Cliente não existe' }
}

//sucess
{
	"charge": {
		"id_cobranca": 3,
		"id_usuario": null,
		"id_cliente": 1,
		"descricao": "boleto",
		"valor": "1000",
		"vencimento": "2023-07-24T03:00:00.000Z",
		"status": "Vencida"
	},
	"nome_cliente": "BKing"
}
```

</details>


### **Cobrança/Cliente** 

<details>
<summary><b>Buscar e Ordenção</b></summary>

<details>
<summary>Clientes</summary>
	
#### `GET` `/cliente?search=lucas`

Esta é a rota que permite buscar um cliente.

#### **Exemplo de requisição**

```javascript
// GET /cliente?search=BKing
//header
{
  headers: {        
    authorization: token,
  }
}

```

#### **Exemplos de resposta**

```javascript
//error
{
  {message: "Não autorizado"}
  {message: "Nenhum cliente encontrado!"}
}
//sucess
[
  {
     "id_cliente":2,
    "id_usuario":1,
    "nome_cliente": "lucas",
    "email": "lucas@test.com.br",
    "cpf": "10438953029",
    "telefone": "12345678912",
    "cep": null,
    "endereco": null,
    "complemento": null,
    "bairro": null,
    "cidade": null,
    "estado": null,
    "status":"em dia" 
  }
]
```

#### `GET` `/cliente?status=em`

Esta é a rota que permite buscar um cliente por status.

#### **Exemplo de requisição**

```javascript
// GET /cliente?status=em
//header
{
  headers: {        
    authorization: token,
  }
}

```

#### **Exemplos de resposta**

```javascript
//error
{
  {message: "Não autorizado"}
  {message: "Nenhum cliente encontrado!"}
}
//sucess
[
  {
     "id_cliente":3,
    "id_usuario":1,
    "nome_cliente": "marcos",
    "email": "fut@test.com.br",
    "cpf": "28773901016",
    "telefone": "12345678912",
    "cep": null,
    "endereco": null,
    "complemento": null,
    "bairro": null,
    "cidade": null,
    "estado": null,
    "status":"Em dia" 
  },
  {
     "id_cliente":2,
    "id_usuario":1,
    "nome_cliente": "lucas",
    "email": "lucas@test.com.br",
    "cpf": "10438953029",
    "telefone": "12345678912",
    "cep": null,
    "endereco": null,
    "complemento": null,
    "bairro": null,
    "cidade": null,
    "estado": null,
    "status":"em dia" 
  }
]
```


#### `GET` `/cliente?search=02714638156`

Esta é a rota que permite buscar um cliente por um cpf.

#### **Exemplo de requisição**

```javascript
// GET /cliente?search=02714638156
//header
{
  headers: {        
    authorization: token,
  }
}

```

#### **Exemplos de resposta**

```javascript
//error
{
  {message: "Não autorizado"}
  {message: "Nenhum cliente encontrado!"}
}
//sucess
[
  {
     "id_cliente":1,
    "id_usuario":1,
    "nome_cliente": "Ryander",
    "email": "ryander@test.com.br",
    "cpf": "02714638156",
    "telefone": "12345678912",
    "cep": null,
    "endereco": null,
    "complemento": null,
    "bairro": null,
    "cidade": null,
    "estado": null,
    "status":"Em dia" 
  }
]
```

#### `GET` `/cliente?search=fut@test`

Esta é a rota que permite buscar um cliente por um e-mail.

#### **Exemplo de requisição**

```javascript

// GET /cliente?search=fut@test

//header
{
  headers: {        
    authorization: token,
  }
}

```

#### **Exemplos de resposta**

```javascript
//error
{

  {message: "Não autorizado"}
  {message: "Nenhum cliente encontrado!"}
}
//sucess
[
  {
     "id_cliente":3,
    "id_usuario":1,
    "nome_cliente": "marcos",
    "email": "fut@test.com.br",
    "cpf": "28773901016",
    "telefone": "12345678912",
    "cep": null,
    "endereco": null,
    "complemento": null,
    "bairro": null,
    "cidade": null,
    "estado": null,
    "status":"Em dia" 
  }
]
```
</details>

<details>
<summary>Cobrança</summary>
</details>	

</details>

<details>
<summary><b>Botão "ver todos" </b></summary>

#### `GET` `/cobranca/vencidas`

Esta é a rota que permite listar todas as cobranças vencidas.

#### **Exemplo de requisição**

```javascript

// GET /cobranca/vencidas

//header
{
  headers: {        
    authorization: token,
  }
}
```

#### **Exemplos de resposta**

```javascript
//error
{
  { message: "Não autorizado" }

}

//sucess
{
		"id_cobranca": 19,
		"id_usuario": null,
		"id_cliente": 1,
		"descricao": "boleto",
		"valor": "1000",
		"vencimento": "2023-07-28T03:00:00.000Z",
		"status": "Vencida",
		"cliente": "BKing"
	},
	{
		"id_cobranca": 20,
		"id_usuario": null,
		"id_cliente": 1,
		"descricao": "boleto",
		"valor": "1000",
		"vencimento": "2023-07-28T03:00:00.000Z",
		"status": "Vencida",
		"cliente": "BKing"
	}
}
```


#### `GET` `/cobranca/pendentes`

Esta é a rota que permite listar todas as cobranças pendentes.

#### **Exemplo de requisição**

```javascript
// GET /cobranca/pendentes
//header
{
  headers: {        
    authorization: token,
  }
}
```

#### **Exemplos de resposta**

```javascript
//error
{
 { message: "Não autorizado" }
}

//sucess
{
  {
		"id_cobranca": 5,
		"id_usuario": null,
		"id_cliente": 1,
		"descricao": "boleto",
		"valor": "1000",
		"vencimento": "2023-07-30T03:00:00.000Z",
		"status": "Pendente",
		"cliente": "BKing"
	},
		{
		"id_cobranca": 18,
		"id_usuario": null,
		"id_cliente": 1,
		"descricao": "boleto",
		"valor": "7000",
		"vencimento": "2023-07-27T03:00:00.000Z",
		"status": "Pendente",
		"cliente": "BKing"
	}
}
```

#### `GET` `/cobranca/pagas`

Esta é a rota que permite listar todas as cobranças pagas.

#### **Exemplo de requisição**

```javascript
// GET /cobranca/pagas
//header
{
  headers: {        
    authorization: token,
  }
}
```

#### **Exemplos de resposta**

```javascript
//error
{
 { message: "Não autorizado" }
}

//sucess
{
  {
		"id_cobranca": 5,
		"id_usuario": null,
		"id_cliente": 1,
		"descricao": "boleto",
		"valor": "1000",
		"vencimento": "2023-07-30T03:00:00.000Z",
		"status": "Paga",
		"cliente": "BKing"
	},
		{
		"id_cobranca": 18,
		"id_usuario": null,
		"id_cliente": 1,
		"descricao": "boleto",
		"valor": "7000",
		"vencimento": "2023-07-27T03:00:00.000Z",
		"status": "Paga",
		"cliente": "BKing"
	}
}
```

#### `GET` `/cobranca/emdia`

Esta é a rota que permite listar todas as cobranças em dia.

#### **Exemplo de requisição**

```javascript
// GET /cobranca/emdia
//header
{
  headers: {        
    authorization: token,
  }
}
```

#### **Exemplos de resposta**

```javascript
//error
{
 { message: "Não autorizado" }
}

//sucess
{
  {
		"id_cobranca": 5,
		"id_usuario": null,
		"id_cliente": 1,
		"descricao": "boleto",
		"valor": "1000",
		"vencimento": "2023-07-30T03:00:00.000Z",
		"status": "Em dia",
		"cliente": "BKing"
	},
		{
		"id_cobranca": 18,
		"id_usuario": null,
		"id_cliente": 1,
		"descricao": "boleto",
		"valor": "7000",
		"vencimento": "2023-07-27T03:00:00.000Z",
		"status": "Em dia",
		"cliente": "BKing"
	}
}
```


#### `GET` `/cobranca/inadimplentes`

Esta é a rota que permite listar todas as cobranças inadimplentes.

#### **Exemplo de requisição**

```javascript
// GET /cobranca/inadimplentes
//header
{
  headers: {        
    authorization: token,
  }
}
```

#### **Exemplos de resposta**

```javascript
//error
{
 { message: "Não autorizado" }
}

//sucess
{
  {
		"id_cobranca": 5,
		"id_usuario": null,
		"id_cliente": 1,
		"descricao": "boleto",
		"valor": "1000",
		"vencimento": "2023-07-30T03:00:00.000Z",
		"status": "Inadimplentes",
		"cliente": "BKing"
	},
		{
		"id_cobranca": 18,
		"id_usuario": null,
		"id_cliente": 1,
		"descricao": "boleto",
		"valor": "7000",
		"vencimento": "2023-07-27T03:00:00.000Z",
		"status": "Inadimplentes",
		"cliente": "BKing"
	}
}
```
</details>

---
