import db from '../models/db';

const {
  check,
  validationResult,
} = require('express-validator/check');

const validateParty = [
  check('name').matches(/[a-zA-Z]+/).withMessage('name must contain only alphabets')
    .custom(value => db.query('select * from parties where name = $1', [value]).then((party) => {
      if (party.rowCount >= 1) throw new Error('name already exists');
    }))
    .trim(),
  check('hqAddress').exists().withMessage('Please input an address')
    .trim(),
  check('logoUrl').exists().withMessage('please upload image'),
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

const EditPartyName = [
  check('name').matches(/[a-zA-Z]+/).withMessage('name must contain only alphabets')
    .custom(value => db.query('select * from parties where name = $1', [value]).then((party) => {
      if (party.rowCount >= 1) throw new Error('name already exists');
    }))
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 50 }),
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


export { validateParty, EditPartyName };
