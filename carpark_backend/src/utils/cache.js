const Redis = require('redis');
const redisConfig = require('../config/redis');

const redisClient = Redis.createClient(redisConfig);

redisClient.connect();

redisClient.on('error', err => {
    console.log(JSON.stringify(err));
    throw new Error('Redis error');
});

module.exports = redisClient;


