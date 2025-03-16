const express = require('express');
const { placeTrade, settleTrades } = require('../controllers/tradeController');
const socketIoMiddleware = require('../middlewares/socketIoMiddleware'); // Import socketIoMiddleware
const { authenticate } = require('../middlewares/authMiddleware');


const router = express.Router();

router.post('/', socketIoMiddleware, placeTrade); // User places a trade

router.post('/:eventId/settle', settleTrades); // Settle trades after event result

module.exports = router;
