import Joi from 'joi';

const validateParty = (party) => {
  const schema = {
    name: Joi.string().trim().min(3).required(),
  };
  // const options = ;
  const options = {
    language: {
      key: '{{key}} ',
    },
    abortEarly: false,
  };
  return Joi.validate(party, schema, options);
};

export default validateParty;
