const express = require('express');

const router = express.Router();

const postsDB = require('../posts/postDb')

const cm = require('../middleware/middleware')
const validatePostId = cm.validatePostId

router.get('/', (req, res) => {
  postsDB.get()
    .then(posts => {
      if(posts) {
        res.status(200).json(posts)
      }else{
        res.status(404).json({ errorMessage: "no posts found"})
      }
    }).catch
    (error => {
      res.status(500).json({error: 'there was an error retrieving users from database'})
    })
  
  // do your magic!
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post)
  // do your magic!
});

router.delete('/:id',validatePostId, (req, res) => {
const id = req.params.id
postsDB
.remove(id)
.then(() => res.status(200).json())
.catch(error => {
  res.status(500).json({error: 'there was an error retrieving users from database'})
})
  // do your magic!
});

router.put('/:id', validatePostId, (req, res) => {
  const id = req.post.id
  postsDB
  .update(id, { text: req.body.text })
  .then(() => {
    res.status(200).json({...req.post, text: req.body.text })
  })
  .catch(error => {
    res.status(500).json({error: 'there was an error retrieving users from database'})
  })
  // do your magic!
});

// custom middleware

// function validatePostId(req, res, next) {
  // do your magic!
// }

module.exports = router;
