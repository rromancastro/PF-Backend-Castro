import dotenv from 'dotenv';
dotenv.config();

import request from 'supertest';
import mongoose from 'mongoose';
import chai from 'chai';
import app from '../src/app.js';

const expect = chai.expect;

describe('Adoption Router', function () {
  before(async function () {
    await mongoose.connect(process.env.MONGO_URL);
  });

  after(async function () {
    await mongoose.connection.close();
  });

  let createdAdoptionId = null;
  const validUserId = '6883088c72086ef0c8ede620';
  const validPetId = '6883088c72086ef0c8ede623';

  it('GET /api/adoptions - debe devolver lista de adopciones', async function () {
    const res = await request(app).get('/api/adoptions');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('POST /api/adoptions/:uid/:pid - debe crear una adopción', async function () {
    const res = await request(app)
      .post(`/api/adoptions/${validUserId}/${validPetId}`)
      .send();
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('_id');
    createdAdoptionId = res.body._id;
  });

  it('GET /api/adoptions/:aid - debe devolver la adopción creada', async function () {
    const res = await request(app).get(`/api/adoptions/${createdAdoptionId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('_id', createdAdoptionId);
  });

  it('GET /api/adoptions/:aid - debe devolver 404 para id no existente', async function () {
    const res = await request(app).get('/api/adoptions/64e7c0d08f1b2c123456789f'); // id falso
    expect(res.status).to.equal(404);
  });

  it('POST /api/adoptions/:uid/:pid - debe manejar error por id inválido', async function () {
    const res = await request(app).post('/api/adoptions/invalidUserId/invalidPetId').send();
    expect(res.status).to.equal(400);
  });
});