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

module.exports = {
    SchemesRegister,
    SchemesLogin,
    SchemesUpdate
}

