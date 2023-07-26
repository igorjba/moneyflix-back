const joi = require("joi");

const SchemesRegister = joi.object({
  nome: joi.string().required().messages({
    "any.required": "Este campo deve ser preenchido",
    "string.empty": "Este campo é obrigatório",
  }),
  email: joi.string().email().required().messages({
    "any.required": "Este campo deve ser preenchido",
    "string.empty": "Este campo é obrigatório",
    "string.email": "E-mail inválido",
  }),
  senha: joi.string().required().messages({
    "any.required": "Este campo deve ser preenchido",
    "string.empty": "Este campo é obrigatório",
  }),
});

const SchemesLogin = joi.object({
  email: joi.string().email().required().messages({
    "any.required": "Este campo deve ser preenchido",
    "string.empty": "Este campo é obrigatório",
    "string.email": "E-mail ou senha inválido",
  }),

  senha: joi.string().required().messages({
    "any.required": "Este campo deve ser preenchido",
    "string.empty": "Este campo é obrigatório",
  }),
});

const SchemesCharges = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "Este campo deve ser preenchido",
  }),
  valor: joi.number().positive().required().messages({
    "number.base": "O campo valor deve ser um número.",
    "number.positive": "O campo valor deve ser um número positivo.",
    "any.required": "Este campo deve ser preenchido",
  }),
  vencimento: joi.date().required().messages({
    "any.required": "Este campo deve ser preenchido",
  }),
  status: joi.string().required().messages({
    "any.required": "Este campo deve ser preenchido",
  }),
});

const SchemesNewClients = joi.object({
  nome: joi.string().required().messages({
    "any.required": "Nome deve ser preenchido",
    "string.empty": "Nome é obrigatório",
  }),

  email: joi.string().email().required().messages({
    "any.required": "E-mail deve ser preenchido",
    "string.empty": "E-mail é obrigatório",
    "string.email": "E-mail inválido",
  }),

  cpf: joi.string().required().messages({
    "any.required": "CPF deve ser preenchido",
    "string.empty": "CPF é obrigatório",
  }),

  telefone: joi.string().required().messages({
    "any.required": "Telefone deve ser preenchido",
    "string.empty": "Telefone é obrigatório",
  }),

  cep: joi.string().messages({
    "string.empty": "Informe um cep válido!",
  }),

  logradouro: joi.string(),

  complemento: joi.string(),

  bairro: joi.string(),

  cidade: joi.string().messages({
    "string.empty": "Informe uma cidade válida!",
  }),

  estado: joi.string().messages({
    "string.empty": "Informe um estado válido!",
  }),

  status: joi.string().messages({
    "string.empty": "Estatus inválido!",
  }),
});

const SchemesUpdateClient = joi.object({
  nome: joi.string().messages({
    "string.empty": "Nome inválido!",
  }),

  email: joi.string().email().messages({
    "string.empty": "E-mail inválido!",
    "string.email": "E-mail inválido!",
  }),

  telefone: joi.string().messages({
    "string.empty": "Telefone inválido!",
  }),

  cep: joi.string().messages({
    "string.empty": "CEP inválido!",
  }),

  logradouro: joi.string(),

  complemento: joi.string(),

  bairro: joi.string(),

  cidade: joi.string().messages({
    "string.empty": "Cidade inválida!",
  }),

  estado: joi.string().messages({
    "string.empty": "Estado inválido!",
  }),

  status: joi.string().messages({
    "string.empty": "Estatus inválido!",
  }),
});

module.exports = {
  SchemesRegister,
  SchemesLogin,
  SchemesCharges,
  SchemesNewClients,
  SchemesUpdateClient,
};
