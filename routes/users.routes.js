const express = require('express')
const { getAllUsersActive, createUser, updateUser, deleteUser } = require('../controllers/user.controllers')
const { userExist } = require('../middlewares/users.middlewares')
const { createUserValidators } = require('../middlewares/validator.middleware')

// controllers


const usersRouter = express.Router()
usersRouter.get('/', getAllUsersActive)
usersRouter.post('/', createUserValidators, createUser)
usersRouter.patch('/:id', userExist, updateUser)
usersRouter.delete('/:id', userExist, deleteUser)

module.exports = { usersRouter }