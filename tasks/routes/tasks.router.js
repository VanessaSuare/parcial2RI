const express = require('express');
const TaskService = require('../services/tasks.service');
const router = express.Router();
const service = new TaskService();

router.get('/', async (req, res) => {
  const userId = req.query.userid;
  res.json(await service.findAll(userId));
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newTask = await service.create(body);
    res.status(newTask ? 201 : 401).json(newTask);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const resp = await service.updateStatus(id, status);
  res.json(resp);
});

module.exports = router;
