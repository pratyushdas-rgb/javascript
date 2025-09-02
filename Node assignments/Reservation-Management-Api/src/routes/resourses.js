const express = require('express');
const Resource = require('../models/Resource');
const { authenticateToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, isAdmin, async (req, res, next) => {
  try {
    const resources = await Resource.findAll();
    res.json(resources);
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateToken, isAdmin, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Resource name required' });
    }

    const resource = await Resource.create({ name, description });
    res.status(201).json(resource);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticateToken, isAdmin, async (req, res, next) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }  


    res.json(resource);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticateToken, isAdmin, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    await resource.update({ name: name || resource.name, description: description || resource.description });
    res.json(resource);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticateToken, isAdmin, async (req, res, next) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    const deletedResource=await resource.destroy();
    res.status(200).json({msg: "Resource deleted successfully"});

  } catch (error) {
    next(error);
  }
});

module.exports = router;