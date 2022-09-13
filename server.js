const dotenv = require('dotenv')
const { app } = require('./app')

// utils
const { initModels } = require('./middlewares/initModels')
const { db } = require('./utils/database.utils')

dotenv.config({ path: './config.env' });

const startServer = async () => {
    try {
        await db.authenticate()

        // relaciones entre modelos
        initModels()
        await db.sync()
        const PORT = 4000
        app.listen(PORT, () => {
            console.log('express is running')
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()