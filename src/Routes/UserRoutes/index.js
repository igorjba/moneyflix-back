const express = require('express')



const { register } = require('../../Controllers/Users/registerUser')
const { login } = require('../../Controllers/Users/loginUser')


const UserRoutes = express()

UserRoutes.get('/usuario')
UserRoutes.post('/usuario', register)
UserRoutes.put('/usuario')

UserRoutes.post('/login')

module.exports = UserRoutes