const Controllers = require('../controllers')
const Socket = Controllers.Socket

module.exports = (io) => {
    io.use((socket,next)=>{
        let token = socket.handshake.query.token;
        //Import the middleware here
        next();
    })
    
    io.of('/driver-ride-request').on('connection',(socket)=>Socket.DriverRideRequest(socket,io));
    io.of('/user-ride-request').on('connection',(socket)=>Socket.UserRideRequest(socket,io));
    io.of('/user-driver-inprogress').on('connection',(socket)=>Socket.UserDriverInprogress(socket,io));
    io.of('/realtime-database-updates').on('connection',(socket)=>Socket.RealtimeDatabaseUpdates(socket,io));
    io.of('/live-chat').on('connection',(socket)=>Socket.LiveChat(socket,io));
};

