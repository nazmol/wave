const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');

const User = require('./model');
const config = require('../../../config/').server;

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next()
});

router.get('/', (req, res) => {
  User.find({}).exec()
    .then(users => {
      res.json(users)
    });
});

router.post('/', (req, res) => {
  User.findOne({name: req.body.name})
    .exec()
    .then(user => {
      if(!user){
        res.json({ 
          success: false, 
          message: 'Authentication failed. User not found.' 
        });

        return;
      };
      if(!user.comparePassword(req.body.password)){
        res.json({ 
          success: false, 
          message: 'Authentication failed. Wrong password.' 
        });
        return;
      };
        
      const token = jwt.sign(user, config.secret, {
        expiresIn : 60*60*24
      });
  
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    })
    .catch(err => {
      console.log('Something has been catched', err);
      res.end('foo')
    })
});

router.put('/', (req, res) => {
  const user = new User({ 
    name: 'Gregor Vashich', 
    password: 'password',
    admin: true 
  });
  user
    .save()
    .then(response => res.json({ success: true }));
});

module.exports = router;