import type { DecodedIdToken } from "firebase-admin/auth";
import { AuthRepository } from './auth.repository.js'
import crypto from 'crypto'
import redis from '../../../../shared/redis/redis.js'

export class AuthService {
    constructor(private authRepository: AuthRepository) { }

    async googleLogin(firebaseUser: DecodedIdToken) {

        const existingUser = await this.authRepository.findByFirebaseUid(
            firebaseUser.uid
        )
        if (existingUser) {
            return existingUser
        }

        const newUser = await this.authRepository.createUser({
            firebaseUid: firebaseUser.uid,
            email: firebaseUser.email ?? '',
            name: firebaseUser.name ?? '',
            avatar: firebaseUser.picture ?? '',
        })
        return newUser;
    }
}