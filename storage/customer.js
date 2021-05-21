/* eslint-disable max-len */

async function getCustomer(req, customerId) {
  const ObjectID = req.mongo.ObjectID;

  const res = await req.mongo.db.collection('customers').findOne({_id: new ObjectID(customerId)});
  return res
}

async function getCustomers(req) {
  return req.mongo.db.collection('customers').find();
}

async function createCustomer(req, payload) {
  return req.mongo.db.collection('customers').insertOne(payload);
}

async function deleteCustomer(req, customerId) {
  const customer = getCustomer(req, customerId);

  if (customer) {
    const ObjectID = req.mongo.ObjectID;

    return req.mongo.db.collection('customers').deleteOne({_id: new ObjectID(customerId)});
  }
}

async function updateCustomer(req, customerId, payload) {
  const customer = getCustomer(req, customerId);

  let result;

  if (customer && payload) {
    const ObjectID = req.mongo.ObjectID;

    result = await req.mongo.db.collection('customers').findOneAndUpdate(
        {_id: new ObjectID(customerId)},
        {$set: {...payload}},
        {returnOriginal: false}
    );
  }

  return result;
}

export {
  getCustomer,
  getCustomers,
  createCustomer,
  deleteCustomer,
  updateCustomer
};
