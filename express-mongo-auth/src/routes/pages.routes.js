import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';
import userService from '../services/UserService.js';
import userRepository from '../repositories/UserRepository.js';

const router = express.Router();

// Página de inicio
router.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

// -------------------
// AUTH
// -------------------
router.get('/signIn', (req, res) => {
  res.render('auth/signIn', { title: 'Iniciar Sesión' });
});

router.get('/signUp', (req, res) => {
  res.render('auth/signUp', { title: 'Registro' });
});

// -------------------
// USER
// -------------------
router.get('/dashboard', authenticate, authorize(['user', 'admin']), async (req, res, next) => {
  try {
    const user = await userService.getById(req.userId);
    res.render('user/dashboard', { title: 'Dashboard Usuario', user });
  } catch (err) {
    next(err);
  }
});

router.get('/profile', authenticate, authorize(['user', 'admin']), async (req, res, next) => {
  try {
    const user = await userService.getById(req.userId);
    res.render('user/profile', { title: 'Mi Perfil', user });
  } catch (err) {
    next(err);
  }
});

// -------------------
// ADMIN
// -------------------
router.get('/admin/dashboard', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const users = await userRepository.getAll();
    res.render('admin/dashboard', { title: 'Dashboard Admin', users });
  } catch (err) {
    next(err);
  }
});

// -------------------
// ERRORES
// -------------------
router.get('/403', (req, res) => {
  res.status(403).render('errors/403', { title: 'Acceso Denegado' });
});

router.get('/404', (req, res) => {
  res.status(404).render('errors/404', { title: 'Página no encontrada' });
});

export default router;
