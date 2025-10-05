import userRepository from '../repositories/UserRepository.js';

class UserService {

    async getAll() {
        return userRepository.getAll();
    }

    async getById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            const err = new Error('Usuario no encontrado');
            err.status = 404;
            throw err;
        }
        return {
            id: user._id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            birthdate: user.birthdate,
            roles: user.roles.map(r => r.name)
        };
    }

    async updateById(id, data) {
        return userRepository.updateById(id, data);
    }

}

export default new UserService();
