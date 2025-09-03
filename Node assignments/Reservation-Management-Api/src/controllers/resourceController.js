const resourceRepo = require('../repositories/resourceRepository');

const getAllResources = async (req, res, next) => {
  try {
    const resources = await resourceRepo.findAll();
    res.json(resources);
  } catch (error) {
    next(error);
  }
};

const createResource = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Resource name required' });
    }

    const resource = await resourceRepo.create({ name, description });
    res.status(201).json(resource);
  } catch (error) {
    next(error);
  }
};

const getResourceById = async (req, res, next) => {
  try {
    const resource = await resourceRepo.findById(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Resource not found' });

    res.json(resource);
  } catch (error) {
    next(error);
  }
};

const updateResource = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const resource = await resourceRepo.findById(req.params.id);

    if (!resource) return res.status(404).json({ error: 'Resource not found' });

    const updatedResource = await resourceRepo.update(resource, {
      name: name || resource.name,
      description: description || resource.description,
    });

    res.json(updatedResource);
  } catch (error) {
    next(error);
  }
};

const deleteResource = async (req, res, next) => {
  try {
    const resource = await resourceRepo.findById(req.params.id);

    if (!resource) return res.status(404).json({ error: 'Resource not found' });

    await resourceRepo.remove(resource);
    res.status(200).json({ msg: 'Resource deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllResources,
  createResource,
  getResourceById,
  updateResource,
  deleteResource,
};