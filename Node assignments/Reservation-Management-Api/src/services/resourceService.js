const resourceRepo = require('../repositories/resourceRepository');

const getAllResources = async () => {
  return await resourceRepo.findAll();
};

const createResource = async (name, description) => {
  if (!name) throw new Error('Resource name required');
  return await resourceRepo.create({ name, description });
};

const getResourceById = async (id) => {
  return await resourceRepo.findById(id);
};

const getResourceByResourceName = async(name)=>{
  return await resourceRepo.findByName(name);
}

const getResourceByUpdatedAtDate = async(updatedAt)=>{
  return await resourceRepo.findByUpdatedDate(updatedAt)
} 

const getResourceByUpdatedDateOnly = async(updatedAt)=>{
  return await resourceRepo.findByUpdatedDateOnly(updatedAt)
}


const updateResource = async (id, {name, description}) => {
  const resource = await resourceRepo.findById(id);
  if (!resource) throw new Error('Resource not found');

  return await resourceRepo.update(resource, {
    
    name: name || resource.name,
    description: description || resource.description,
  });
};

const deleteResource = async (id) => {
     const resource = await resourceRepo.findById(id);
  if (!resource) throw new Error('Resource not found');


  await resourceRepo.remove(resource);
  return { msg: 'Resource deleted successfully' };
};

module.exports = { getAllResources, createResource, getResourceById, updateResource, deleteResource ,getResourceByResourceName, getResourceByUpdatedAtDate, getResourceByUpdatedDateOnly };
