/* eslint-disable new-cap */
import {StorageError, GenericError} from '../constants/errors.js';
import * as customer from '../storage/customer.js';
import * as Boom from '@hapi/boom';

async function handleRetrieveAllCustomer(req) {
  if (!req.mongo) throw Boom.internal(GenericError.ConnectionError);

  let retrieveOp;

  try {
    retrieveOp = await customer.getCustomers(req);
  } catch (e) {
    throw Boom.internal(StorageError.CustomersRetrievingError);
  }

  const customerResult = await retrieveOp.toArray();

  if (!customerResult || customerResult.lenght === 0) {
    req.log('info', 'No customer found');
    throw new Boom.notFound(StorageError.CustomersRetrievingError);
  }

  const resultArray = customerResult.map((customer) => {
    return {
      ...customer.payload,
      _id: customer._id.toString()
    };
  } );

  return resultArray; // TODO remapping
}

async function handleCreateCustomer(req) {
  if (!req.mongo) throw Boom.internal(GenericError.ConnectionError);

  const payload = req.payload;

  let insertOp;

  try {
    insertOp = await customer.createCustomer(req, payload);
  } catch (e) {
    throw new Boom.internal(StorageError.CustomerCreationError);
  }

  return insertOp;
}

async function handleRetrieveCustomer(req) {
  if (!req.mongo) throw Boom.internal(GenericError.ConnectionError);

  const customerId = req.params.id;

  let retrieveOp;

  try {
    retrieveOp = await customer.getCustomer(req, customerId);
  } catch (e) {
    throw Boom.internal(StorageError.CustomerRetrievingError);
  }

  if (!retrieveOp) {
    req.log('info', 'No customer found with id ' + customerId);
    throw Boom.notFound(StorageError.CustomerRetrievingError);
  }

  return retrieveOp; // TODO remapping
}

async function handleUpdateCustomer(req) {
  if (!req.mongo) throw Boom.internal(GenericError.ConnectionError);

  const payload = req.payload;
  const customerId = req.params.id;

  const firstName = payload.firstName;
  const lastName = payload.lastName;
  const fiscalId = payload.fiscalId;

  if ((firstName || lastName) && !fiscalId) {
    throw Boom.badRequest(GenericError.ValidationError);
  }

  let updateOp;

  try {
    updateOp = await customer.updateCustomer(req, customerId, payload);
  } catch (e) {
    throw Boom.internal(StorageError.CustomerUpdateError);
  }


  if (!updateOp || updateOp.ok === 0 || !updateOp.value) {
    req.log('info', 'No customer update with id ' + customerId);
    throw new Boom.notFound(StorageError.CustomerUpdateError);
  }

  return updateOp.value.payload;
}

async function handleDeleteCustomer(req) {
  if (!req.mongo) throw Boom.internal(GenericError.ConnectionError);

  const customerId = req.params.id;

  let deleteOp;

  try {
    deleteOp = await customer.deleteCustomer(req, customerId);
  } catch (e) {
    throw new Boom.internal(StorageError.CustomerDeleteError);
  }


  if (!deleteOp || deleteOp.deletedCount === 0) {
    req.log('info', 'No customer delete with id ' + customerId);
    throw new Boom.notFound(StorageError.CustomerDeleteError);
  }

  return {};
}

export {
  handleRetrieveAllCustomer,
  handleCreateCustomer,
  handleRetrieveCustomer,
  handleUpdateCustomer,
  handleDeleteCustomer
};

