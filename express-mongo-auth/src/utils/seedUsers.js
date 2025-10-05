import bcrypt from 'bcryptjs';
import userRepository from '../repositories/UserRepository.js';
import roleRepository from '../repositories/RoleRepository.js';

export default async function seedUsers() {
  try {
    const existingAdmin = await userRepository.findByEmail('admin@app.com');
    if (existingAdmin) {
      console.log('Usuario admin ya existe');
      return;
    }

    const adminRole = await roleRepository.findByName('admin')
      || await roleRepository.create({ name: 'admin' });

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
    const hashedPassword = await bcrypt.hash('Admin#2025', saltRounds);

    const adminUser = {
      name: 'Ariadna',
      lastName: 'Admin',
      phoneNumber: '999999999',
      birthdate: new Date('1999-01-01'),
      email: 'admin@app.com',
      password: hashedPassword,
      roles: [adminRole._id],
      url_profile: 'https://i.imgur.com/6VBx3io.png',
      address: 'Calle Principal 123, Lima'
    };

    await userRepository.create(adminUser);
    console.log('Usuario administrador creado: admin@app.com / Admin#2025');
  } catch (err) {
    console.error('Error creando usuario admin:', err.message);
  }
}
