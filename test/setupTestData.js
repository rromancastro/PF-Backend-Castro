import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from '../src/dao/models/User.js';
import Pet from '../src/dao/models/Pet.js';

async function createTestData() {
  await mongoose.connect(process.env.MONGO_URL);


  const user = new User({
    first_name: 'Test',
    last_name: 'User',
    email: `testuser${Date.now()}@mail.com`,
    password: 'hashedPassword123', 
    role: 'user',
    pets: []
  });
  await user.save();

  const pet = new Pet({
    name: 'TestPet',
    specie: 'Perro',
    birthDate: new Date('2020-01-01'),
    adopted: false,
    owner: user._id,
    image: ''
  });
  await pet.save();

  console.log('User ID:', user._id.toString());
  console.log('Pet ID:', pet._id.toString());

  await mongoose.connection.close();
}

createTestData().catch(console.error);