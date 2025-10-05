import authService from '../services/AuthService.js';

class AuthController {

    async signUp(req, res, next) {
        try {
            const payload = req.body;
            if (!payload.email || !payload.password)
                return res.status(400).json({ message: 'El email y password son requeridos' });

            // ⚡ Convertir birthdate a Date real
            if (payload.birthdate) {
                payload.birthdate = new Date(payload.birthdate);
            }

            const user = await authService.signUp(payload);
            res.redirect('/signIn');

            console.log("Payload recibido:", req.body);
        } catch (err) {
            next(err);
        }
    }

    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(400).json({ message: 'El email y password son requeridos' });

            // 👇 authService devuelve { token, user }
            const { token, user } = await authService.signIn({ email, password });

            // Devolver datos al frontend
            res.status(200).json({
                token,
                role: user?.roles?.[0]?.name || 'user',
                name: user?.name || '',
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();
