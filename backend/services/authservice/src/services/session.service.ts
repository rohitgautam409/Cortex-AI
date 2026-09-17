import crypto from 'crypto'
import redis from '../../../../shared/redis/redis.js'


const SESSION_TTL = 7 * 24 * 60 * 60;

export class SessionService {



    async createSession(user: any) {

        const sessionId = crypto.randomUUID();

        const sessionData = {
            userId: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            // plan: user.plan,
            // credits: user.credits,
            // totalCredits: user.totalCredits,
            // planExpiresAt: user.planExpiresAt,
        };

        // userId -> sessionId
        await redis.set(
            `user-session-${user._id}`,
            sessionId,
            "EX",
            SESSION_TTL
        );

        // sessionId -> session data
        await redis.set(
            `session-${sessionId}`,
            JSON.stringify(sessionData),
            "EX",
            SESSION_TTL
        );

        return sessionId;
    }


    async deleteSession(sessionId: string) {

        const sessionData = await redis.get(
            `session-${sessionId}`
        );

        if (!sessionData) {
            return;
        }

        const session = JSON.parse(sessionData);

        await redis.del(
            `user-session-${session.userId}`
        );

        await redis.del(
            `session-${sessionId}`
        );

    }

    async getUserId(sessionId: string) {
        const session = await redis.get(`session-${sessionId}`)

        if (!session) {
            return null;
        }
        return JSON.parse(session)
    }
}
