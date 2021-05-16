import {server as _server} from '@hapi/hapi';
import * as swagger from 'hapi-swagger';
import * as inert from '@hapi/inert';
import * as vision from '@hapi/vision';
import * as customer from './customers/route.js';
import * as mongodb from 'hapi-mongodb';
import * as dotenv from 'dotenv';


const init = async () => {
  dotenv.config();

  const server = _server({
    debug: {
      request: ['error', 'info', 'debug']
    },
    port: process.env.NODE_SERVER_PORT,
    host: '0.0.0.0'
  });

  await server.register([
    {
      plugin: mongodb,
      options: {
        url: `mongodb://${process.env.MONGO_SERVER_USERNAME}:${process.env.MONGO_SERVER_PASSWORD}@${process.env.MONGO_SERVER_ADDRESS}?ssl=${process.env.MONGO_SSL_ENABLED}`,
        settings: {
          useUnifiedTopology: true
        },
        decorate: true
      }
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
        documentationPath: '/doc',
        debug: true
      }
    }
  ]);

  server.route(customer.routes);
  await server.start();

  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
