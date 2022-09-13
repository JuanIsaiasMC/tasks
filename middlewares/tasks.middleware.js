const { Tasks } = require("../models/tasks.models")

const tasksExist = async (req, res, next) => {
    try {
        const { id } = req.params
        const task = await Tasks.findOne({
            where: { id }
        })
        if (!task) {
            return res.status(404).json({
                status: 'error',
                message: 'task not found'
            })

        }
        req.task = task
        next()
    } catch (error) {
        console.log(error)
    }
}

const taskIsActive = async (req, res, next) => {
    try {
        const { id } = req.params
        const taskStatus = await Tasks.findOne({
            where: { id, status: 'active' }
        })

        if (!taskStatus) {
            return res.status(400).json({
                status: 'error',
                message: 'task not active'
            })
        }
        req.taskStatus = taskStatus
        next()

    } catch (error) {
        console.log(error);
    }
}
module.exports = { tasksExist, taskIsActive }