import { Router } from 'express';
import User from '../dao/models/User.js';
import Pet from '../dao/models/Pet.js';

const router = Router();

router.get('/', (req, res) => {
  res.render('welcome');
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().lean();
    res.render('users', { users });
  } catch (error) {
    res.status(500).send('Error al obtener usuarios');
  }
});

router.get('/pets', async (req, res) => {
  try {
    const pets = await Pet.find().lean();
    res.render('pets', { pets });
  } catch (error) {
    res.status(500).send('Error al obtener mascotas');
  }
});

export default router;