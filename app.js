const express = require('express')
const { tasksRouter } = require('./routes/tasks.routes')
const { usersRouter } = require('./routes/users.routes')



const app = express()
// json datos
app.use(express.json())

// routers
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/tasks', tasksRouter)


app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `${req.method} ${req.url} does not exists in our server`,
    });
});

module.exports = { app }