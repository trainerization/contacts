import Joi from 'joi';
import * as schema from '../constants/schema.js';
import * as handler from './handler.js';

const routeBasePath = '/customers';

export const routes = [
  {
    method: 'GET',
    path: routeBasePath,
    handler: (req) => handler.handleRetrieveAllCustomer(req),
    config: {
      response: {
        schema: Joi.array().items(schema.customerSchema)
      },
      tags: ['Customers', 'api'],
      description: 'Retrive all customer ids'
    }
  },
  {
    method: 'GET',
    path: routeBasePath + '/{id}',
    handler: (req) => handler.handleRetrieveCustomer(req),
    config: {
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        })
      },
      response: {
        schema: schema.customerSchema
      },
      tags: ['Customers', 'api'],
      description: 'Retrive customer information'
    }
  },
  {
    method: 'POST',
    path: routeBasePath,
    handler: (req) => handler.handleCreateCustomer(req),
    config: {
      validate: {
        payload: schema.customerSchema
      },
      response: {
        schema: schema.customerSchema
      },
      tags: ['Customers', 'api'],
      description: 'Create a customer'
    }
  },
  {
    method: 'DELETE',
    path: routeBasePath + '/{id}',
    handler: (req) => handler.handleDeleteCustomer(req),
    config: {
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        })
      },
      tags: ['Customers', 'api'],
      description: 'Delete a customer'
    }
  },
  {
    method: 'PUT',
    path: routeBasePath + '/{id}',
    handler: (req) => handler.handleUpdateCustomer(req),
    config: {
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        }),
        payload: schema.customerSchema
      },
      response: {schema: schema.customerSchema},
      tags: ['Customers', 'api'],
      description: 'Update customer information'
    }
  }];
