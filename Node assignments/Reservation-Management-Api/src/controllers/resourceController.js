const resourceService = require('../services/resourceService');

const getAllResources = async (req, res, next) => {

  try {

    const resources = await resourceService.getAllResources();
    res.json(resources);
  } catch (error) {
    next(error);
    
  }
};

const createResource = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || name.trim()=== "") {
      return res.status(400).json({ error: 'Resource name required' });
    }
    
    const resource = await resourceService.createResource( name, description );
    res.status(201).json(resource);
  } catch (error) {
    next(error);
  }
};

const getResourceById = async (req, res, next) => {

  try {
    const resource = await resourceService.getResourceById(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    next(error);
  }

};

const getResourceByResourceName = async(req,res,next) =>{
  try{
    const resource = await resourceService.getResourceByResourceName(req.params.name);
    if(!resource){
      return res.status(404).json({ error: 'Resource not found' });

    }
    res.json(resource)
  }
  catch(error){
    next(error);
  }
}

const getResourceByUpdatedAtDate = async(req,res,next) =>{
  try{
    const resource = await resourceService.getResourceByUpdatedAtDate(req.params.updatedAt);
    if(!resource){
      return res.status(404).json({error: 'Resource not found'});
    }
    res.json(resource)
  }
  catch(error){
     next(error);
  }
}

const updateResource = async (req, res, next) => {
  
  try {
    const { name, description } = req.body;


    const resource = await resourceService.updateResource(req.params.id, { name, description });
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json(resource);


  } catch (error) {
    next(error);
  }
};

const deleteResource = async (req, res, next) => {
  
  
  try {
    const deleted = await resourceService.deleteResource(req.params.id);
  

    if (!deleted) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    
    res.json({ msg: 'Resource deleted successfully' });
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
  getResourceByResourceName,
  getResourceByUpdatedAtDate
};
