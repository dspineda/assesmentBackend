const {Router} = require('express');

const {
  loginUserHandler,
} = require('./local.controller');

const router = Router();

router.post('/login', loginUserHandler);

module.exports = router;