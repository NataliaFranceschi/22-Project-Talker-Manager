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

module.exports = {
  getAlltalkers,
  readTalkerManagerFile,
  writeTalkerManagerFile,
  getManagerById,
};