import Joi from 'joi';

const cfRegex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;

const addressObject = Joi.object().keys({
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

const customerSchema = Joi.object().keys({
  _id: Joi.string(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  fiscalId: Joi.string().regex(cfRegex).required(),
  address: addressObject,
  billingAddress: addressObject,
  email: Joi.string().required(),
  phone1: Joi.string().required(),
  phone2: Joi.string(),
  birthDate: Joi.date().iso().required(),
  sex: Joi.string().valid('F', 'M', 'A').required()
});


export {
  customerSchema
};
