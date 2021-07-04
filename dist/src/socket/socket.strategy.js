"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIoClientStrategy = void 0;
const microservices_1 = require("@nestjs/microservices");
class SocketIoClientStrategy extends microservices_1.Server {
    constructor(client) {
        super();
        this.client = client;
    }
    listen(callback) {
        this.client.on('connection', () => {
            console.log('connect');
        });
        this.client.on('error', (error) => {
            console.log(error);
        });
        this.messageHandlers.forEach((handler, pattern) => {
            this.client.on(pattern, (data) => {
                handler(data, this.client);
            });
        });
        callback();
    }
    close() {
        this.client.disconnect();
    }
}
exports.SocketIoClientStrategy = SocketIoClientStrategy;
//# sourceMappingURL=socket.strategy.js.map