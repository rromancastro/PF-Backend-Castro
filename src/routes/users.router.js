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
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               first_name: Juan
 *               last_name: Pérez
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 *
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /api/users/mock/{count}:
 *   post:
 *     summary: Generar usuarios mock
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: count
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cantidad de usuarios mock a generar
 *     responses:
 *       200:
 *         description: Usuarios mock generados exitosamente
 *       400:
 *         description: Parámetro inválido
 *       500:
 *         description: Error en el servidor
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