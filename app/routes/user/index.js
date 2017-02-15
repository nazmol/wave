const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');

const User = require('./model');
const config = require('../../../config/').server;

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {/*
  const token = 
    req.body.token || req.query.token || req.headers['x-access-token'];
  
  const jwtPromise = (token, secret) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if(err) reject(err);
        resolve(decoded);
      });
    });
  };

  if(token){   
    jwtPromise(token, config.secret)
      .then(decoded => {
        req.decoded = decoded;   
        next(); 
      }, err => {
        res.json({ 
          success: false, 
          message: 'Failed to authenticate token.' 
        });
      });
  } else {
    res.status(403).send({ success: false, message: 'No token provided.' });
  }
  */
  next()
});

router.get('/', (req, res) => {
  User.find({}).exec()
    .then(users => {
      res.json(users)
    });
});

router.post('/', (req, res) => {
  console.log(req.body)
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
      user.comparePassword(req.body.password)
        .then(isMatch => {
          if(!isMatch){
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