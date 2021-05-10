/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

async function getCustomer(req) {
  const ObjectID = req.mongo.ObjectID;

  return await req.mongo.db.collection('customers').findOne({_id: new ObjectID(req.params.id)});
}

async function createCustomer(req) {
  return await req.mongo.db.collection('customers').insertOne(req.payload);
}

async function deleteCustomer(req) {
  const customer = getCustomer(req);

  if (customer) {
    const ObjectID = req.mongo.ObjectID;

    return await req.mongo.db.collection('customers').deleteOne({_id: new ObjectID(req.params.id)});
  } else {
    // TODO
  }
}

async function updateCustomer(req) {
  const customer = getCustomer(req);

  if (customer) {
  } else {
    // TODO
  }
}

export default [
  getCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer,
];
