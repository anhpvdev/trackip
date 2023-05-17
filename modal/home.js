const home= {
    trackip:(req, res) => { 
        
        var ip2 = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
        var ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
        var check = ip+ "___" + ip2
        res.send(check);
    }

}

module.exports = home