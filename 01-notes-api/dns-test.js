const dns = require("dns");

dns.setServers(["8.8.8.8"]);

dns.promises.resolveSrv(
    "_mongodb._tcp.yt-complete-backend.jubvzoq.mongodb.net"
)
.then(console.log)
.catch(console.error);