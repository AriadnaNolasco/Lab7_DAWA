import userRepository from '../repositories/UserRepository.js';
import roleRepository from '../repositories/RoleRepository.js';
import bcrypt from 'bcryptjs';

export default async function seedUsers() {
  const adminExists = await userRepository.findByEmail('admin@lab.com');
  if (!adminExists) {
    const adminRole = await roleRepository.findByName('admin');
    const hashedPassword = await bcrypt.hash('Admin#123', 10);
    await userRepository.create({
      name: 'Admin',
      lastName: 'Sistema',
      phoneNumber: '999999999',
      birthdate: new Date('1990-01-01'),
      email: 'admin@lab.com',
      password: hashedPassword,
      roles: [adminRole._id]
    });
    console.log('Usuario admin creado');
  }
}
