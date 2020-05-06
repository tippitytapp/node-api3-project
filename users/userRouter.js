const express = require('express');
const Users = require('./userDb.js')
const Posts = require('../posts/postDb.js')
const CMW = require('../customMiddleWare.js')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(user => {
    res.status(201).json({
      user:user
    })
  .catch(error=> {
      res.status(500).json({
        errorMessage: "Server Error",
        error: error
      })
    })
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  Posts.insert(req.body)
  .then(post=>{
    res.status(201).json(post)
  })
  .catch(error => {
    res.status(500).json({
      errorMessage: "internal error",
      error: error
    })
  })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get(req.params)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(user=>{
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({
      errorMessage: "Error Loading Resource"
    })
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json({
      posts:posts
    })
  })
  .catch(error=> {
    res.status(500).json({
      errorMessage: "Server Error",
      error: error
    })
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(count => {
    res.status(200).json({
      count: count,
      message: "Record successfully deleted"
    })
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
  .then(count => {
    if(count = 1){
      res.status(200).json({
        message: "user updated successfully"
      })
    }else{
      res.status(500).json({
        errorMessage: "Error updating user"
      })
    }
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  Users.getById(id)
  .then(user=>{
    if(!user){
      res.status(404).json({
        errorMessage: "No User Matching that ID found"
      })
    }else{
      req.user = req.params.id
      next();
    }
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({
      errorMessage: "Missing user information"
    })
  }else if(!req.body.name){
    res.status(400).json({
      errorMessage: "Missing user name"
    })
  }else{
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({
      errorMessage: "Missing post information"
    })
  }else if(!req.body.text){
    res.status(400).json({
      errorMessage: "Missing post text"
    })
  }else if(!req.body.user_id){
    res.status(400).json({
      errorMessage: "Missing user_id"
    })
  }else{
  next();
}
}

module.exports = router;
