import Router from 'express'
import { agent } from '../controller/agent.controller.js'
// import multer from '../config/multer.js'

const router = Router()

// multer.single('file')

router.post('/chat', agent)

export default router