import User from '../../models/user.model.js'

interface createUserData {
    firebaseUid: string,
    email: string,
    name: string,
    avatar: string
}
export class AuthRepository {

    createUser(data: createUserData) {
        return User.create(data);

    }

    async findByFirebaseUid(firebaseUid: string) {
        return User.findOne({ firebaseUid })
    }
}