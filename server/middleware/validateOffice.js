import Joi from 'joi';

const validateOffice = (office) => {
  const schema = {
    type: Joi.string().min(3).required(),
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(office, schema, { abortEarly: false });
};

export default validateOffice;
