const home= {
    trackip:(req, res) => {        
        var ip1 = req.headers['x-real-ip']
        var ip2 = req.connection.remoteAddress
        var ip2 = req.headers['x-forwarded-for'] 
        var ip2 = req.socket.remoteAddress 


        var check = ip1+ " || " + ip2+ " || " + ip3+ " || " + ip4
        res.send(check);
    }

}

module.exports = home