const express = require('express');
const router = express.Router();

module.exports = isAuthenticated => {
  router.use('/users/me', isAuthenticated, (req, res) => {
      console.log(req.user);
      res.send('User');
  });

  return router;
});
