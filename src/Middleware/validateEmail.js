const validateQuery = joiSchema => async (req, res, next) => {

    try {
        await joiSchema.validateAsync(req.query)

        next()
    } catch (error) {
        return res.status(515).json({ message: error.message })
    }
}
module.exports = validateQuery