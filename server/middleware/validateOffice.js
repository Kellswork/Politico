import Joi from 'joi';

const validateOffice = (office) => {
  const schema = {
    type: Joi.string().trim().min(3).required(),
    name: Joi.string().trim().min(3).required(),
  };
  // const options = ;
  const options = {
    language: {
      key: '{{key}} ',
    },
    abortEarly: false,
  };
  return Joi.validate(office, schema, options);
};

export default validateOffice;
