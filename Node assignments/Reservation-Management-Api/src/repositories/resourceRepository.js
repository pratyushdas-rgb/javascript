const Resource = require('../models/Resource');




const findAll = async () => {
  return await Resource.findAll();
};

const findById = async (id) => {
  return await Resource.findByPk(id);
};



const create = async (data) => {
  return await Resource.create(data);
};


const update = async (resource, data) => {
  return await resource.update(data);
};

const remove = async (resource) => {
  return await resource.destroy();
};

module.exports = { findAll, findById, create, update, remove };