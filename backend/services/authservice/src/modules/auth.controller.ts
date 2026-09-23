import type { Request, Response } from 'express'
import { AuthService } from './auth.service.js'
import { SessionService } from '../services/session.service.js'

export class AuthController {

    constructor(private authService: AuthService, private sessionService: SessionService) {

    }

    googleLogin = async (req: Request, res: Response) => {

        const firebaseUser = req.user

        if (!firebaseUser) {
            res.status(401).json({
                message: "User is not authenticated"
            })
            return;
        }
        const user = await this.authService.googleLogin(
            firebaseUser
        )

        const sessionId = await this.sessionService.createSession(user);

        res.cookie('session', sessionId, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "Authentication Successful",
            data: user
        })
    }

    logout = async (req: Request, res: Response) => {
        try {
            const sessionId = req.cookies?.session;

            if (sessionId) {
                await this.sessionService.deleteSession(sessionId);
            }

            res.clearCookie("session");

            return res.status(200).json({
                message: "Logout successful"
            });

        } catch (error) {
            return res.status(500).json({
                message: `Logout error ${error}`
            })
        }
    }
}