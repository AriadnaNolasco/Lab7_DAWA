import userService from '../services/UserService.js';

class UserController {

    async getAll(req, res, next) {
        try {
            const users = await userService.getAll();
            res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    }

    async getMe(req, res, next) {
        try {
            const user = await userService.getById(req.userId);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    async updateMe(req, res, next) {
        try {
            const updated = await userService.updateById(req.userId, req.body);
            res.status(200).json({ message: 'Perfil actualizado', user: updated });
        } catch (err) {
            next(err);
        }
    }

}

export default new UserController();
