const {
  check,
  validationResult,
} = require('express-validator/check');

const validaton = [
  check('name').matches(/[a-zA-Z]+/).withMessage('name must contain only alphabets').trim(),
  check('type').isLength({
    min: 5,
  }).withMessage('type must contain atleast 5 characters').trim(),
  // eslint-disable-next-line func-names
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        error: errors.array().map(i => i.msg),
      });
    }
    next();
  },
];

export default validaton;
