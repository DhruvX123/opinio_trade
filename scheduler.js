
const cron = require('node-cron');
const fetchAndStoreLiveEvents = require('./tasks/fetchLiveEvents');
const settleAllTrades = require('./tasks/settleTrades');


cron.schedule('*/5 * * * *', fetchAndStoreLiveEvents);

cron.schedule('*/10 * * * *', settleAllTrades);
