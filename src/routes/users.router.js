/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rutas para gestionar usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *   get/uid:
 *     summary: obtener un usuario
 *     tags: [Users]
 *     parameters:
 *       - id: uid
 *   put/uid:
 *     summary: actualizar un usuario
 *     tags: [Users]
 *     parameters:
 *       - data: data
 *   delete/uid:
 *     summary: eliminar un usuario
 *     tags: [Users]
 *     parameters:
 *       - id: uid  
 */

import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import { generateMockUsers } from '../utils/userMocker.js';
import User from '../dao/models/User.js';

const router = Router();

router.get('/',usersController.getAllUsers);

router.get('/:uid',usersController.getUser);
router.put('/:uid',usersController.updateUser);
router.delete('/:uid',usersController.deleteUser);

router.post('/mock/:count', async (req, res) => {
  const count = parseInt(req.params.count);

  if (isNaN(count) || count < 1) {
    return res.status(400).json({ error: 'El parámetro count debe ser un número positivo' });
  }

  try {
    const mockUsers = await generateMockUsers(count);
    await User.insertMany(mockUsers);
    res.json({ message: `Se insertaron ${count} usuarios mock correctamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar usuarios mock' });
  }
});


export default router;