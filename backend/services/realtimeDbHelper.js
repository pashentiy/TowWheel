const Config = require('../config.js');
const socketIOClient = require('socket.io-client')

const realtimeDbEvent = socketIOClient('http://localhost:'+Config.port+'/realtime-database-updates');

realtimeDbEvent.on('connect', socket=>{ 
    console.log('Realtime DB realtimeDbEvent Socket Connected.');
});

exports.realtimeDbEvent = realtimeDbEvent