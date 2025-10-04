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
            return res.redirect('/signIn');

        } catch (err) {
            next(err);
        }
        
        console.log("Payload recibido:", req.body);
    }

    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password)
                return res.status(400).json({ message: 'El email y password son requeridos' });

            const token = await authService.signIn({ email, password });
            return res.redirect('user/dashboard');
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();
