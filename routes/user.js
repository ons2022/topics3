const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getProfile, updateProfile } = require('../services/userService');

/**
 * @swagger
 * /api/user/profile:
 *   post:
 *     summary: Get user profile
 *     description: Retrieve the profile of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *       500:
 *         description: Server error
 */
router.post('/profile', auth, getProfile);

/**
 * @swagger
 * /api/user/update-profile:
 *   post:
 *     summary: Update user profile
 *     description: Update the profile of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
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
 *             required:
 *               - firstName
 *               - lastName
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       500:
 *         description: Server error
 */
router.post('/update-profile', auth, updateProfile);


/**
 * @swagger
 * /home:
 *   get:
 *     summary: Access home
 *     description: Retrieve home information (authenticated users only).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Home information retrieved successfully
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Server error
 */
router.get('/home', auth, (req, res) => {
  res.status(200).json({ message: 'Welcome to the home page!' });
});

module.exports = router;
