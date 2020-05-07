const express = require('express');
const Posts = require('./postDb.js')
const CMW = require('../customMiddleWare.js')
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get(req.query)
  .then(posts=> {
    res.status(200).json(posts)
  })
  .catch(error => {
    res.status(500).json({
      errorMessage: "There was an error retrieving posts",
      error: error
    })
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  Posts.getById(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    res.status(500).json({
      errorMessage: "Server Error",
      error: error
    })
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
