const express = require('express');
const UserService = require('../services/users.service');
const router = express.Router();
const service = new UserService();

router.get('/', async (req, res) => {
  const { role } = req.query;
  res.json(await service.findAll(role));
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(newUser ? 201 : 401).json(newUser[1] ? newUser[0] : false);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await service.findById(id);
  res.json(user);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const resp = await service.validate(username, password);
  const logged = resp !== null;
  res.json({ logged, ...(logged && { user: resp }) });
});

module.exports = router;
