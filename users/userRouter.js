const express = require('express');

const router = express.Router();

const postDB = require('../posts/postDb')

const userDB = require('./userDb')

const cm = require('../middleware/middleware')
const validateUserId = cm.validateUserId
const validateUser = cm.validateUser
const validatePost = cm.validatePost




router.get('/', (req, res) => {
  userDB.get()
    .then(users => {
      if(users) {
        res.status(200).json(users)
      }else{
        res.status(404).json({ errorMessage: "no users found"})
      }
    }).catch
    (error => {
      res.status(500).json({error: 'there was an error retrieving users from database'})
    })
  
  // do your magic!
});

router.get('/:id', validateUserId, (req, res) => {
res.status(200).json(req.user)
  // do your magic!
});

router.get('/:id/posts', validateUserId, (req, res) => {
const id = req.params.id
userDB.getUserPosts(id)
.then(posts => {
  if (posts.length > 0 ) {
    res.status(200).json(posts)
  }else{
    res.status(404).json({errorMessage: "no post found for the specified user"})
  }
})
.catch(error => {
  res.status(500).json({error: "could not get posts by user"})
})
  // do your magic!
});


router.post('/', validateUser, (req, res) => {
  const { name } = req.body;

  userDB.insert({ name: name })
  .then(user => {res.status(201).json(user)})
  .catch(err => {res.status(500).json({ error: "could not add user to database."})})
  // do your magic!
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const id = req.params.id
  postDB.insert({ user_id: id, text: req.body.text })
  .then(post => {res.status(201).json(post)})
  .catch(error => {res.status(500).json({ message: "could not add post to database"})})
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
const id = req.params.id
userDB.remove(req.user.id)
.then(() => {res.status(200).json({success: true})})
.catch(error => { res.status(500).json({ error: "could not delete the specified user"})})
  // do your magic!
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const id = req.params.id
  userDB.update(id, {name: req.body.name })
  .then(() => { db.getById(id)
    
  .then(user => {res.status(200).json(user)})
 
})
.catch(error => {
  res.status(500).json({error: 'there was an error retrieving users from database'})
})

  
    // do your magic!
});

//custom middleware

// function validateUserId(req, res, next) {
  // do your magic!
// }

// function validateUser(req, res, next) {
  // do your magic!
// }

// function validatePost(req, res, next) {
  // do your magic!
// }

module.exports = router;
