// SERVER/API/USERS
const express = require('express');
const router = express.Router();

module.exports = isAuthenticated => {
  router.use('/me', isAuthenticated, (req, res) => {
      console.log(req.user);
      res.send('User');
  });

  return router;
};
