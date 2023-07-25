const joi = require('joi')

const SchemesRegister = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'Este campo deve ser preenchido',
        'string.empty': 'Este campo é obrigatório'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'Este campo deve ser preenchido',
        'string.empty': 'Este campo é obrigatório',
        'string.email': 'E-mail inválido'
    }),
    senha: joi.string().required().messages({
        'any.required': 'Este campo deve ser preenchido',
        'string.empty': 'Este campo é obrigatório'
    })
})

const SchemesLogin = joi.object({
    email: joi.string().email().required().messages({
        'any.required': 'Este campo deve ser preenchido',
        'string.empty': 'Este campo é obrigatório',
        'string.email': 'E-mail ou senha inválido'
    }),

    senha: joi.string().required().messages({
        'any.required': 'Este campo deve ser preenchido',
        'string.empty': 'Este campo é obrigatório'
    })
})

const SchemesUpdate = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'Este campo deve ser preenchido',
        'string.empty': 'Este campo é obrigatório'
    }),

    email: joi.string().email().required().messages({
        'any.required': 'Este campo deve ser preenchido',
        'string.empty': 'Este campo é obrigatório',
        'string.email': 'E-mail inválido'
    }),

    cpf: joi.string().allow('', null),
})

const SchemesCharges = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'Este campo deve ser preenchido',
    }),
    valor: joi.number().positive().required().messages({
        'number.base': 'O campo valor deve ser um número.',
        'number.positive': 'O campo valor deve ser um número positivo.',
        'any.required': 'Este campo deve ser preenchido',
    }),
    vencimento: joi.date().required().messages({
        'any.required': 'Este campo deve ser preenchido',
    }),
    status: joi.string().required().messages({
        'any.required': 'Este campo deve ser preenchido',
    }),
})

module.exports = {
    SchemesRegister,
    SchemesLogin,
    SchemesUpdate,
    SchemesCharges
}

