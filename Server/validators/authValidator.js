// validators/authValidator.js

const { check, validationResult } = require('express-validator');

exports.validateRegister = [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];
