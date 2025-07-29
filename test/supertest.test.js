import dotenv from 'dotenv';
dotenv.config();

import request from 'supertest';
import mongoose from 'mongoose';
import chai from 'chai';
import app from '../src/app.js';

import User from '../src/dao/models/User.js';
import Pet from '../src/dao/models/Pet.js';
import { faker } from '@faker-js/faker';
import Adoption from '../src/dao/models/Adoption.js';

const expect = chai.expect;

describe('Adoption Router', function () {
  let userId, petId, createdAdoptionId;

  before(async function () {
    await mongoose.connect(process.env.MONGO_URL);


    await User.deleteMany({});
    await Pet.deleteMany({});

    const user = await User.create({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'user',
      pets: []  
    });

    const pet = await Pet.create({
      name: "Pet",
      specie: faker.animal.cat(),
      birthDate: new Date('2020-01-01'),
      adopted: false,
      owner: user._id,
      image: ''
    });

    userId = user._id.toString();
    petId = pet._id.toString();
  });

    after(async function () {
    await User.deleteMany({});
    await Pet.deleteMany({});
    await Adoption.deleteMany({}); // ⬅️ limpiar adopciones
    await mongoose.connection.close();
  });

  it('GET /api/adoptions - debe devolver lista de adopciones (puede estar vacía)', async function () {
    const res = await request(app).get('/api/adoptions');

    if (res.status === 404) {
      expect(res.body.message).to.equal('No hay adopciones');
    } else {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('payload');
      expect(res.body.payload).to.be.an('array');
    }
  });

  it('POST /api/adoptions/:uid/:pid - debe crear una adopción', async function () {
    const res = await request(app)
      .post(`/api/adoptions/${userId}/${petId}`)
      .send();
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('payload');
    expect(res.body.payload).to.have.property('_id');
    createdAdoptionId = res.body.payload._id;
  });

  it('GET /api/adoptions/:aid - debe devolver la adopción creada', async function () {
    const res = await request(app).get(`/api/adoptions/${createdAdoptionId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('payload');
    expect(res.body.payload).to.have.property('_id', createdAdoptionId);
  });

  it('GET /api/adoptions/:aid - debe devolver 404 para id no existente', async function () {
    const res = await request(app).get('/api/adoptions/64e7c0d08f1b2c123456789f');
    expect(res.status).to.equal(404);
  });

  it('POST /api/adoptions/:uid/:pid - debe manejar error por id inválido', async function () {
    this.timeout(5000);
    const res = await request(app).post('/api/adoptions/invalidUserId/invalidPetId').send();
    expect(res.status).to.equal(400);
  });
});
