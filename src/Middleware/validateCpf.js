const BrValid = require("br-validations");

const validateCpf = (req, res, next)=>{
    const { cpf } = req.body;

    const isValid = BrValid.cpf.validate(cpf);

    if(!isValid){
        return res.status(400).json({message: "Digite um CPF válido!"})
    }
    next()
}

module.exports = validateCpf;