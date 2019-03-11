import db from '../models/db';
import { candidates } from '../models/candidate';

const {
  check,
  validationResult,
} = require('express-validator/check');

const validateOffice = [
  check('name').matches(/^[a-zA-Z ]+$/).withMessage('name must contain only alphabets')
    .custom(value => db.query('select * from offices where name = $1', [value]).then((office) => {
      if (office.rowCount >= 1) throw new Error('name already exists');
    }))
    .trim(),
  check('type').exists().withMessage('type is required')
    .isIn(['federal', 'state', 'local government', 'legislative'])
    .withMessage('only federal, state, local government, legislative are allowed')
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

const validateRegisterCandidate = [
  check('id').isNumeric()
    .withMessage('id is not a number')
    .trim()
    .custom(value => db.query(candidates, [value]).then((candidate) => {
      if (candidate.rowCount < 1) throw new Error('candidate does not exist');
    }))
    .trim(),
  check('status').exists().withMessage('status is required')
    .isIn(['accepted', 'rejected'])
    .withMessage('only accepted or rejected is allowed')
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

export { validateOffice, validateRegisterCandidate };
