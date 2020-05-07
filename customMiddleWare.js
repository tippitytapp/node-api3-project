module.exports={
    logger,
    validateUserId,
    validateUser,
    validatePost
};

function logger(req, res, next){
    // logs request method, request url, and a timestamp or each request
    // runs on every request to the API
    const method = req.method;
    const url = req.url;
    const today =  new Date().toISOString();
    console.log(`There was a ${method} request sent to "${url} at [${today}]`)
    next();
}

function validateUserId(req, res, next){
    next();
}

function validateUser(req, res, next){
    next();
}

function validatePost(req, res, next){
    const id = req.params.id;
    Posts.getById(id)
    .then(post=> {
      if(!post){
        res.status(404).json({
          errorMessage: "Post with specified ID not found"
        })
      }else{
        next();
      }
    })
  
}