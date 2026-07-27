const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = require("./src/app");
const connectDB = require("./src/db/db");
const startServer = async () => {
    try {
        await connectDB();

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });

    } catch (error) {
        console.log("Database connection failed");
    }
};

startServer();


