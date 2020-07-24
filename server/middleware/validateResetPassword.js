const {
  check,
  validationResult,
} = require('express-validator/check');


const validateResetPassword = [
  check('password').isLength({
    min: 3,
  })
    .withMessage('password must have atleast 3 characters')
    .isLength({
      max: 50,
    })
    .withMessage('password cannot contain more than 50 characters')
    .matches(/^\S{3,}$/)
    .withMessage('password cannot contain whitespaces')
    .trim(),
  check('passwordAgain').isLength({
    min: 3,
  })
    .withMessage('password must have atleast 3 characters')
    .isLength({
      max: 50,
    })
    .withMessage('password cannot contain more than 50 characters')
    .matches(/^\S{3,}$/)
    .withMessage('password cannot contain whitespaces')
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

export default validateResetPassword;
