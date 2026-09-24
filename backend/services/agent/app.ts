import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import router from './routes/agent.route.js'

dotenv.config()

const PORT = process.env.PORT || 8003

const app = express()

app.use(express.json())

app.use('/', router)

app.get('/', (req, res) => {
    res.json({
        message: "Agent Server is working Perfectly Fine"
    })
})

app.listen(PORT, () => {
    console.log(`agent started at ${PORT}`)
    connectDb()
})