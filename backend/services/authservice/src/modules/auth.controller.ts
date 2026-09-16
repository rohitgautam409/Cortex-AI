import type { Request, Response } from 'express'
import { AuthService } from './auth.service.js'
import crypto from 'crypto'

export class AuthController {

    constructor(private authService: AuthService) {

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

        const sessionId = crypto
            .randomBytes(32)
            .toString("hex");

        res.cookie("sessionId", sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        return res.status(200).json({
            message: "Authentication Successful",
            data: user
        })
    }
}