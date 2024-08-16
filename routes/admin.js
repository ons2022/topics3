const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllUsers, getUserById, deleteUser, updateUser } = require('../services/adminService');

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users (admin only).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       403:
 *         description: Access denied
 *       500:
 *         description: Server error
 */
router.get('/users', auth, getAllUsers);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     summary: Get a specific user
 *     description: Retrieve details of a specific user by their ID (admin only).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       403:
 *         description: Access denied
 *       500:
 *         description: Server error
 */
router.get('/users/:id', auth, getUserById);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by their ID (admin only).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to delete
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Access denied
 *       500:
 *         description: Server error
 */
router.delete('/users/:id', auth, deleteUser);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update a user's details by their ID (admin only).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               address:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               age:
 *                 type: integer
 *               image:
 *                 type: string
 *               gender:
 *                 type: string
 *               profession:
 *                 type: string
 *               role:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User updated successfully
 *       403:
 *         description: Access denied
 *       500:
 *         description: Server error
 */
router.put('/users/:id', auth, updateUser);

module.exports = router;
