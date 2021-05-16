import Joi from 'joi';

const addressObject = Joi.object({
  line1: Joi.string().required(),
  line2: Joi.string(),
  line3: Joi.string(),
  city: Joi.string().required(),
  province: Joi.string().required(),
  zip: Joi.string().required(),
  country: Joi.string().required(),
  details: Joi.string(),
  type: Joi.string().valid('residence', 'billing').required()
});

const customerCreationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  fiscalId: Joi.string().required(),
  address: addressObject,
  billingAddress: addressObject,
  email: Joi.string().required(),
  phone1: Joi.string().required(),
  phone2: Joi.string(),
  birthDate: Joi.date().iso().required(),
  sex: Joi.string().valid('F', 'M', 'A').required()
});

const customerUpdateSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  fiscalId: Joi.string(),
  address: addressObject,
  billingAddress: addressObject,
  email: Joi.string(),
  phone1: Joi.string(),
  phone2: Joi.string(),
  birthDate: Joi.date().iso(),
  sex: Joi.string().valid('F', 'M', 'A')
});

export default [
  customerCreationSchema,
  customerUpdateSchema
];
