const express = require('express');
const bodyParser = require('body-parser');
const talkerManager = require('./talkerManager');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const validateAge = require('./middlewares/validateAge');
const validateName = require('./middlewares/validateName');
const validateTalk = require('./middlewares/validateTalk');
const auth = require('./middlewares/auth');
const generateToken = require('./utils/generateToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const talker = await talkerManager.getAlltalkers();
  res.status(200).json(talker);
});

app.get('/talker/search', auth, async (req, res) => {
  const { q } = req.query;
  const search = await talkerManager.searchTalkerManager(q);
  res.status(200).json(search);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await talkerManager.getManagerById(Number(id));
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker);
});

app.post('/login', validatePassword, validateEmail, (_req, res) => {
  const token = generateToken();
    return res.status(200).json({ token });
});

app.post('/talker', auth, validateName, validateAge, validateTalk, async (req, res) => {
  const { name, age, talk } = req.body;
  const newTalkerManager = await talkerManager.createTalkerManager({ name, age, talk });
  res.status(201).send(newTalkerManager);
});

app.put('/talker/:id', auth, validateTalk, validateName, validateAge, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const updateTalkerManager = await talkerManager.updateTalkerManager(id, { name, age, talk });
  res.status(200).send(updateTalkerManager);
});

app.delete('/talker/:id', auth, async (req, res) => {
  const { id } = req.params;
  const deleted = await talkerManager.deleteTalkerManager(id);

  if (deleted) return res.status(204).end();
  return res.status(404).json({ message: `Não foi encontrado nenhum palestrante com o id ${id}` });
});
