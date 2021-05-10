import * as customer from '../storage/customer.js';
import Joi from "joi";

const routeBasePath = '/customers';

// TODO: per tutti gli handler andrà previsto un wrapper che faccia 
// logica ed utilizza le utility di storage ad ora chiamate direttamente

export const routes = [
    {
    method: 'GET',
    path: routeBasePath + '/{id}',
    handler: (req) => {
        return  customer.getCustomer(req); 
    },
    config: {
        validate: {
            params: Joi.object({
                id: Joi.string().required()
            })
        },
        tags: ['Customers', 'api'],
        description: 'Retrive customer information'
    }
},
{
    method: 'PUT',
    path: routeBasePath + '/',
    handler: (req) => {
        return  customer.createCustomer(req);
    },
    config: {
        validate: {
            payload: Joi.object({
                name: Joi.string().required(),
                surname: Joi.string().required(),
                fiscalId: Joi.string().required()
            })
        },
        tags: ['Customers', 'api'],
        description: 'Create a customer'
    }
},
{
    method: 'DELETE',
    path: routeBasePath + '/{id}',
    handler: (req) => {
        return  customer.deleteCustomer(req);
    },
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
    method: 'PATCH',
    path: routeBasePath + '/{id}',
    handler: (req) => {
        return  customer.deleteCustomer(req);
    },
    config: {
        validate: {
            params: Joi.object({
                id: Joi.string().required()
            }),
            payload: Joi.object({
                name: Joi.string(),
                surname: Joi.string(),
                fiscalId: Joi.string()
            })
        },
        tags: ['Customers', 'api'],
        description: 'Update customer information'
    }
}]