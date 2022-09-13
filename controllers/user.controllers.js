const { Tasks } = require("../models/tasks.models");
const { Users } = require("../models/users.models");

const getAllUsersActive = async (req, res) => {
    try {
        const users = await Users.findAll({
            where: { status: 'active' },

            include: [{
                model: Tasks
            }]
        })
        res.status(200).json({
            status: 'succes',
            data: { users }
        })
    } catch (error) {
        console.log(error)
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const newUser = await Users.create({
            name, email, password
        })
        res.status(201).json({
            status: 'succes',
            data: { newUser }
        })
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body
        const { user } = req
        await user.update({ name, email })
        res.status(200).json({
            status: 'succes',
            data: { user }
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { user } = req
        await user.update({
            status: 'deleted'
        })
        res.status(204).json({
            status: 'succes'
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getAllUsersActive, createUser, updateUser, deleteUser }