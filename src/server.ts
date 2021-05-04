import * as hapi from "hapi";

// Create a server to listen for `8000'goods on `localhost'.
const server: hapi.Server = new hapi.Server({
  host: "localhost",
  port: 3000
});

// Adding routing
server.route({
  method: "GET",
  path: "/hello",
  handler: function(request, h) {
    return "Hello! TypeScript!";
  }
});

// Start up service
async function start() {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("Server running at:", server.info.uri);
}

// Don't forget to start the service
start();
