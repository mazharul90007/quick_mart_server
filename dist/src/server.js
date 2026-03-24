import app from "./app";
import config from "./app/config";
const port = config.port || 4000;
let server;
async function startServer() {
    try {
        server = app.listen(port, () => {
            console.log("Quick Mart Server is running on port: ", port);
        });
    }
    catch (error) {
        console.error("Failed to start server: ", error);
    }
}
startServer();
//# sourceMappingURL=server.js.map