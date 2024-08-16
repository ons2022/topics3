const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  addEquipment,
  searchEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment
} = require('../services/equipmentService');

/**
 * @swagger
 * /api/equipment:
 *   get:
 *     summary: Get all equipment
 *     description: Retrieve a list of all medical equipment.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of equipment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */
router.get('/', auth, getAllEquipment);

/**
 * @swagger
 * /api/equipment:
 *   post:
 *     summary: Add new equipment
 *     description: Add a new medical equipment entry.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               functionalityDescription:
 *                 type: string
 *               locationDescription:
 *                 type: string
 *               contactPhone:
 *                 type: string
 *               username:
 *                 type: string
 *             required:
 *               - name
 *               - latitude
 *               - longitude
 *               - functionalityDescription
 *               - locationDescription
 *               - contactPhone
 *               - username
 *     responses:
 *       201:
 *         description: Equipment added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', auth, addEquipment);

/**
 * @swagger
 * /api/equipment/search:
 *   get:
 *     summary: Search equipment
 *     description: Search for equipment by name or location description.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of the equipment
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Location description of the equipment
 *     responses:
 *       200:
 *         description: List of matching equipment
 *       500:
 *         description: Server error
 */
router.get('/search', auth, searchEquipment);

/**
 * @swagger
 * /api/equipment/{id}:
 *   get:
 *     summary: Get equipment by ID
 *     description: Retrieve details of a specific equipment by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Equipment ID to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Equipment details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Equipment not found
 *       500:
 *         description: Server error
 */
router.get('/:id', auth, getEquipmentById);

/**
 * @swagger
 * /api/equipment/{id}:
 *   put:
 *     summary: Update equipment
 *     description: Update details of a specific equipment by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Equipment ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               functionalityDescription:
 *                 type: string
 *               locationDescription:
 *                 type: string
 *               contactPhone:
 *                 type: string
 *               username:
 *                 type: string
 *             required:
 *               - name
 *               - latitude
 *               - longitude
 *               - functionalityDescription
 *               - locationDescription
 *               - contactPhone
 *               - username
 *     responses:
 *       200:
 *         description: Equipment updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Equipment not found
 *       500:
 *         description: Server error
 */
router.put('/:id', auth, updateEquipment);

/**
 * @swagger
 * /api/equipment/{id}:
 *   delete:
 *     summary: Delete equipment
 *     description: Delete a specific equipment by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Equipment ID to delete
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Equipment deleted successfully
 *       404:
 *         description: Equipment not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, deleteEquipment);

module.exports = router;
