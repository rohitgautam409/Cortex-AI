import redis from '../../shared/redis/redis.js'
import type { Request, Response, NextFunction } from 'express'

export const protect = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const sessionId = req.cookies?.sessionId

        if (!sessionId) {
            return res.status(401).json({
                message: 'Unauthorized. Session not found.'
            })

        }
        const session = await redis.get(`session-${sessionId}`)

        if (!session) {
            res.status(401).json({
                message: 'Unauthorized. Invalid or expired session'
            })
            return
        }
        req.user = JSON.parse(session)
        next();

    } catch (error) {

        res.status(500).json({
            message: `protect error ${error}`
        })
    }

}

export default protect