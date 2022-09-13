const express = require('express')
const { getAllTasks, getTaskByStatus, createTask, updateTask, deleteTask } = require('../controllers/tasks.controllers')
const { tasksExist, taskIsActive } = require('../middlewares/tasks.middleware')

// controllers


const tasksRouter = express.Router()
tasksRouter.get('/', getAllTasks)
tasksRouter.get('/:status', getTaskByStatus)
tasksRouter.post('/', createTask)
tasksRouter.patch('/:id', tasksExist, taskIsActive, updateTask)
tasksRouter.delete('/:id', tasksExist, deleteTask)

module.exports = { tasksRouter }