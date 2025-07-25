import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const roles = ['user', 'admin'];

export async function generateMockUsers(count = 10) {
  const users = [];

  for (let i = 0; i < count; i++) {
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const email = faker.internet.email(first_name, last_name);
    const password = await bcrypt.hash('defaultPass123', 10);
    const role = roles[Math.floor(Math.random() * roles.length)];

    users.push({
      first_name,
      last_name,
      email,
      password,
      role,
      pets: []
    });
  }

  return users;
}