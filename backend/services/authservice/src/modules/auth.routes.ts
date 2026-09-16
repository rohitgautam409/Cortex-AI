import { Router } from 'express'
import { AuthController } from './auth.controller.js'
import { AuthService } from './auth.service.js'
import { AuthRepository } from './auth.repository.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router = Router()

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)

router.post('/', authenticate, authController.googleLogin)

export default router;
