import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import router from './src/modules/chat.route.js'


dotenv.config()

const PORT = process.env.MONGODB_URI || 8002
const app = express()

app.use(express.json())

app.use('/', router);

app.get('/get-health', (req, res) => {
    res.json({
        message: "Chat Server is Working Perfectly fine"
    })
})
app.listen(PORT, () => {
    console.log(`chat started at ${PORT}`)
    connectDb()

})