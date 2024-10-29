const express = require('express');
const whatsappController = require('../controllers/whatsappController');

const router = express.Router();
router.post('/', whatsappController.handleIncomingMessage);

module.exports = router;
