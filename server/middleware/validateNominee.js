const {
  check,
  validationResult,
} = require('express-validator/check');

const validateNominee = [
  check('officeId').isNumeric()
    .withMessage('officeId should be a number')
    .trim(),
  check('partyId').isNumeric()
    .withMessage('partyId should be a number')
    .trim(),
  check('manifesto').isLength({ min: 5 })
    .withMessage('manifesto should not be empty')
    .trim(),
  (req, res, next) => {
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

export default validateNominee;
