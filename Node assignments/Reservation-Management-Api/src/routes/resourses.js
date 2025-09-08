const express = require('express');
const {
  getAllResources,
  createResource,
  getResourceById,
  updateResource,
  deleteResource,
  getResourceByResourceName
} = require('../controllers/resourceController');


// const { authenticateToken, isAdmin } = require('../middleware/auth');

const router = express.Router();
// router.use(authenticateToken,isAdmin)

router.get('/', getAllResources);
router.post('/', createResource);
router.get('/:id', getResourceById);
router.get('/name/:name', getResourceByResourceName)
router.put('/:id', updateResource);
router.delete('/:id', deleteResource);


module.exports = router;