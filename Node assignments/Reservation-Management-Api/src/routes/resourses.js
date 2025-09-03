const express = require('express');
const {
  getAllResources,
  createResource,
  getResourceById,
  updateResource,
  deleteResource,
} = require('../controllers/resourceController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, isAdmin, getAllResources);
router.post('/', authenticateToken, isAdmin, createResource);
router.get('/:id', authenticateToken, isAdmin, getResourceById);
router.put('/:id', authenticateToken, isAdmin, updateResource);
router.delete('/:id', authenticateToken, isAdmin, deleteResource);

module.exports = router;