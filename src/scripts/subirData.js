import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../dao/models/User.js';
import Pet from '../dao/models/Pet.js';

dotenv.config();

const mockUsers = [
  { first_name: 'Ana', last_name: 'García', email: 'ana@mail.com', password: '123456', role: 'user' },
  { first_name: 'Pedro', last_name: 'López', email: 'pedro@mail.com', password: 'abcdef', role: 'admin' },
  { first_name: 'Laura', last_name: 'Ruiz', email: 'laura@mail.com', password: 'qwerty', role: 'user' }
];

const mockPets = [
  { name: 'Luna', specie: 'Perro' },
  { name: 'Milo', specie: 'Gato' },
  { name: 'Simón', specie: 'Conejo' }
];

const insertMockData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    await User.deleteMany();
    await Pet.deleteMany();

    const usersWithEncryptedPasswords = await Promise.all(
      mockUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
        pets: []
      }))
    );

    await User.insertMany(usersWithEncryptedPasswords);
    await Pet.insertMany(mockPets);

    console.log('Datos de prueba insertados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('Error al insertar datos:', error);
    process.exit(1);
  }
};

insertMockData();