import Joi from 'joi';

const validateParty = (req, res, next) => {
  const schema = {
    name: Joi.string().trim().min(3).required(),
  };
  const options = {
    language: {
      key: '{{key}} ',
    },
    abortEarly: false,
  };
  const { error } = Joi.validate(req.body, schema, options);
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
  }
  next();
};

export default validateParty;
