const fs = require('fs').promises;
const { join } = require('path');

const path = './talker.json';

const readTalkerManagerFile = async () => {
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const writeTalkerManagerFile = async (talkerManager) => {
  try {
    await fs.writeFile(join(__dirname, path), JSON.stringify(talkerManager));
  } catch (error) {
    return null;
  }
};

const getAlltalkers = async () => {
  const talkerManager = await readTalkerManagerFile();
  return talkerManager;
};

const getManagerById = async (id) => {
  const talkerManager = await readTalkerManagerFile();
  return talkerManager.find((manager) => manager.id === id);
};

const createTalkerManager = async (talkerManagerRequest) => {
 const talkerManager = await readTalkerManagerFile();
  const newTalkerManager = {
    id: talkerManager[talkerManager.length - 1].id + 1,
    ...talkerManagerRequest,
  }; 
  talkerManager.push(newTalkerManager);
  await writeTalkerManagerFile(talkerManager); 

  return newTalkerManager;
};

const updateTalkerManager = async (id, talkerManagerRequest) => {
  const talkerManager = await readTalkerManagerFile();
  const update = talkerManager.find((e) => e.id === Number(id));
  update.name = talkerManagerRequest.name;
  update.age = talkerManagerRequest.age;
  update.talk = talkerManagerRequest.talk; 
  
  await writeTalkerManagerFile(talkerManager); 
 
  return update;
};

module.exports = {
  getAlltalkers,
  readTalkerManagerFile,
  writeTalkerManagerFile,
  getManagerById,
  createTalkerManager,
  updateTalkerManager,
};