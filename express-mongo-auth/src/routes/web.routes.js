import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

// SignIn y SignUp
router.get('/signIn', (req, res) => res.render('auth/signin', { title: 'Iniciar sesión' }));
router.get('/signUp', (req, res) => res.render('auth/signup', { title: 'Registrarse' }));

// Dashboards (simples con control de token)
router.get('/dashboard-user', (req, res) => res.render('users/dashboard_user', { title: 'Dashboard Usuario' }));
router.get('/dashboard-admin', (req, res) => res.render('users/dashboard_admin', { title: 'Dashboard Admin' }));

// Perfil
router.get('/profile', (req, res) => res.render('users/profile', { title: 'Mi perfil' }));

export default router;
