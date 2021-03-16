
module.exports = (io) => {
    io.use((socket,next)=>{
        let token = socket.handshake.query.token;
        //Import the middleware here
        next();
    })
    
};

