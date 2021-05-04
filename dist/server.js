"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi = require("hapi");
// Create a server to listen for `8000'goods on `localhost'.
const server = new hapi.Server({
    host: "localhost",
    port: 3000
});
// Adding routing
server.route({
    method: "GET",
    path: "/hello",
    handler: function (request, h) {
        return "Hello! TypeScript!";
    }
});
// Start up service
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield server.start();
        }
        catch (err) {
            console.log(err);
            process.exit(1);
        }
        console.log("Server running at:", server.info.uri);
    });
}
// Don't forget to start the service
start();
//# sourceMappingURL=server.js.map