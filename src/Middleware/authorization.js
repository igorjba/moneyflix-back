const validateBody = joiSchema => async (req, res, next) => {

    try {
        await joiSchema.validateAsync(req.body)

        next()
    } catch (error) {
        return res.status(513).json({ message: error.message })
    }
}
module.exports = validateBody   