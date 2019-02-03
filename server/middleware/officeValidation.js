const {
  check,
  validationResult,
} = require('express-validator/check');

const validaton = [
  check('name').isAlpha().trim(),
  check('type').isLength({
    min: 2,
  }),
  // eslint-disable-next-line func-names
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    next();
  },
];

export default validaton;
