import express from 'express'
import dotenv from 'dotenv'
import proxy from 'express-http-proxy'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT || 8000
const AUTH_SERVICE = process.env.AUTH_SERVICE



if (!AUTH_SERVICE) {
    throw new Error('AUTH_SERVICE environment variable is not defined')
}

const app  = express();

// Enable CORS for all routes and origins for development
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}))

app.use('/auth', proxy(AUTH_SERVICE))

app.get('/gateway-health', (req, res) => {

    res.json({
        message: "Gateway server is working perfectly fine"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})