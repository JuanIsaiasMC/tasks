const { Tasks } = require("../models/tasks.models");
const { Users } = require("../models/users.models");

const getAllTasks = async (req, res) => {
    try {
        const task = await Tasks.findAll({
            include: { model: Users }
        })
        res.status(200).json({
            status: 'succes',
            data: { task }
        })
    } catch (error) {
        console.log(error);
    }
}

const getTaskByStatus = async (req, res) => {
    try {
        const { status } = req.params

        const statusOptions = ['active', 'cancelled', 'late', 'completed']

        const task = await Tasks.findAll({
            where: { status: status }
        })

        const includeStatus = statusOptions.includes(status)

        if (includeStatus === false) {
            return res.status(400).json({
                status: 'error',
                message: 'status not valid'
            })
        }

        res.status(200).json({
            status: 'succes',
            data: { task }
        })

    } catch (error) {
        console.log(error);
    }
}

const createTask = async (req, res) => {
    try {
        const { title, userId, startDate, limitDate } = req.body
        const newTask = await Tasks.create({
            title, userId, startDate, limitDate
        })

        res.status(200).json({
            status: 'succes',
            data: { newTask }
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteTask = async (req, res) => {
    try {
        const { task } = req
        await task.update({
            status: 'cancelled'
        })
        res.status(200).json({
            status: 'succes',
            message: 'task deleted'
        })
    } catch (error) {
        console.log(error)
    }
}


// patch checar los dates

const updateTask = async (req, res) => {
    try {
        const { finishDate } = req.body
        const { taskStatus } = req

        await taskStatus.update({ finishDate })
        if (taskStatus.limitDate >= taskStatus.finishDate) {
            await taskStatus.update({ status: 'completed' })
        }

        if (taskStatus.limitDate < taskStatus.finishDate) {
            await taskStatus.update({ status: 'late' })
        }
        res.status(200).json({
            status: 'succes',
            data: { taskStatus }
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createTask, deleteTask, getAllTasks, getTaskByStatus, updateTask }