import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser'
import authroute from './src/modules/auth.routes.js'

dotenv.config()

const PORT = process.env.PORT || 8001
const app = express();

app.use(express.json())
app.use(cookieParser())

app.use('/login', authroute)

app.get('/auth-health', (req, res) => {

    res.json({
        message: "Auth server is working perfectly fine"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
    connectDB()
})