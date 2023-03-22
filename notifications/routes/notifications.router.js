const express = require('express');
const NotificationService = require('../services/notifications.service');
const router = express.Router();
const service = new NotificationService();

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newNotification = await service.create(body);
    res.status(newNotification ? 201 : 401).json(newNotification);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res) => {
  const notifications = await service.findAll();
  res.json(notifications);
});

module.exports = router;
