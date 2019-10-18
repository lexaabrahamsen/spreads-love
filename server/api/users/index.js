const express = require('express');
const router = express.Router();

module.exports = (db, isAuthenticated) => {
  const User = require('../../models/user')(db);

  router.use('/me', isAuthenticated, (req, res) => {
      res.json(req.user);
  });

  router.get('/:id', isAuthenticated, (req, res) => {
      const { id } = req.params;

      User.findById(id, '-hashedPassword -salt').then(user => {
          res.json(user);
      });
  });

  return router;
};
