import Joi from 'joi';

const validateOffice = (req, res, next) => {
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
  const { error } = Joi.validate(req.body, schema, options);

  if (error) {
    const errorMessage = error.details.map(element => element.message);
    return res.status(400).json({
      status: 400,
      error: errorMessage,
    });
  }
  next();
};

export default validateOffice;
