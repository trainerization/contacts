import { server as _server } from '@hapi/hapi';
import * as swagger from "hapi-swagger";
import * as inert from "@hapi/inert";
import * as vision from "@hapi/vision";
import * as customer from "./customers/route.js";
import * as mongodb from "hapi-mongodb";

const init = async () => {

    const server = _server({
        port: 3000,
        host: 'localhost'
    });

    await server.register([{
        plugin: mongodb,
        options: {
          url: 'mongodb://admin:admin@127.0.0.1?ssl=false',
          settings: {
            useUnifiedTopology: true
        },
        decorate: true
        },
    },
    inert,
    vision,
    {
        plugin: swagger,
        options: {
            info: {
                title: `API Documentation for Customers`
            },
            schemes: ['http'],
            basePath: '/',
            documentationPath:'/doc',
            debug:true
        }
    }]);

    server.route(customer.routes);
    await server.start();

    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();