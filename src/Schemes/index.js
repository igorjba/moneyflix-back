const Joi = require("joi");

const SchemesRegister = Joi.object({
  nome: Joi.string().required().min(3).pattern(/^[\p{L}][\p{L}\s]{2,}$/u).messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
    "string.base": "Campo nome inválido",
    "string.pattern.base": "Campo nome inválido"
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "O campo email é obrigatório",
      "string.empty": "O campo email é obrigatório",
      "string.email": "E-mail inválido",
      "string.base": "O campo email precisa ser uma string",
    }),
  senha: Joi.string().required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha é obrigatório",
    "string.base": "O campo senha precisa ser uma string",
  }),
});

const SchemesLogin = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "O campo e-mail é obrigatório",
      "string.empty": "O campo e-mail é obrigatório",
      "string.email": "E-mail inválido",
      "string.base": "O campo e-mail precisa ser uma string",
    }),
  senha: Joi.string().required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha é obrigatório",
    "string.base": "O campo senha precisa ser uma string",
  }),
});

const SchemesCharges = Joi.object({
  descricao: Joi.string().required().messages({
    "any.required": "Este campo deve ser preenchido",
  }),
  valor: Joi.number().positive().required().messages({
    "number.base": "O campo valor deve ser um número.",
    "number.positive": "O campo valor deve ser um número positivo.",
    "any.required": "Este campo deve ser preenchido",
  }),
  vencimento: Joi.date().required().messages({
    "any.required": "Este campo deve ser preenchido",
  }),
  status: Joi.string().required().messages({
    "any.required": "Este campo deve ser preenchido",
  }),
});

const SchemesClients = Joi.object({
  nome: Joi.string().required().messages({
    "any.required": "Nome deve ser preenchido",
    "string.empty": "Nome é obrigatório",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "E-mail deve ser preenchido",
      "string.empty": "E-mail é obrigatório",
      "string.email": "E-mail inválido",
    }),

  cpf: Joi.string().required().messages({
    "any.required": "CPF deve ser preenchido",
    "string.empty": "CPF é obrigatório",
  }),

  telefone: Joi.string().required().messages({
    "any.required": "Telefone deve ser preenchido",
    "string.empty": "Telefone é obrigatório",
  }),

  cep: Joi.string().messages({
    "string.empty": "Informe um cep válido!",
  }),

  logradouro: Joi.string(),

  complemento: Joi.string(),

  bairro: Joi.string(),

  cidade: Joi.string().messages({
    "string.empty": "Informe uma cidade válida!",
  }),

  estado: Joi.string().messages({
    "string.empty": "Informe um estado válido!",
  }),

  status: Joi.string().messages({
    "string.empty": "Estatus inválido!",
  }),
});

const SchemesValidateEmail = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "E-mail deve ser preenchido",
      "string.empty": "E-mail é obrigatório",
      "string.email": "E-mail inválido",
    }),
});
module.exports = {
  SchemesRegister,
  SchemesLogin,
  SchemesCharges,
  SchemesClients,
  SchemesValidateEmail,
};
