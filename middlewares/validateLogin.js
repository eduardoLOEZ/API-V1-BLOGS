const { body } = require('express-validator');

const validateLogin= [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }).not().isEmpty().trim()
];

module.exports= {validateLogin}