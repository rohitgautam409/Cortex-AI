import { Router } from 'express'
import { AuthController } from './auth.controller.js'
import { AuthService } from './auth.service.js'
import { AuthRepository } from './auth.repository.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { SessionService } from '../services/session.service.js'

const router = Router()

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository)
const sessionService = new SessionService()
const authController = new AuthController(authService, sessionService)

router.post('/login', authenticate, authController.googleLogin)
router.post('/logout', authController.logout)

export default router;
