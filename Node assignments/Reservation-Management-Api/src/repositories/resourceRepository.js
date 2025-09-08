const Resource = require('../models/Resource');




const findAll = async () => {
  return await Resource.findAll(); //SELECT * FROM resources;
};


//resource
const findById = async (id) => {
  return await Resource.findByPk(id); //SELECT * FROM resources WHERE id = $1;
};

const findByName = async(name) =>{
      return await Resource.findOne({where : {name}});

}

const findByUpdatedDate = async(updatedAt)=>{
  return await Resource.findOne({where : {updatedAt}})
}

const create = async (data) => {
  return await Resource.create(data);
};


const update = async (resource, data) => {
  return await resource.update(data);
};

const remove = async (resource) => {
  return await resource.destroy();
};

module.exports = { findAll, findById, create, update, remove, findByName, findByUpdatedDate };