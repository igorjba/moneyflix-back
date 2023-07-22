const validateBody = joiSchema => async (req, res, next) => {

    try {
        await joiSchema.validateAsync(req.body)


    } catch (error) {
        return res.status(400).json({ mesage: error.message })
    }
    next()
}

module.exports = { validateBody }