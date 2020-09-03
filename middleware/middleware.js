const posts = require('../posts/postDb')

const users = require('../users/userDb')

const validatePostId = (req, res, next) => {
    const id = req.params.id
    posts.getById(id)
    .then((post) => {
        if (post) {
            req.post = post
            next()
        }else{
            res.status(400).json({
                errorMessage: 'invalid post id'
            })
        }
    })
    .catch((error) => {
        next(new Error('could not validata the post id'))
    })
}

const validatePost = (req, res, next) => {
    if(req.body) {
        if(req.body.text) {
            next();
        }else{
            res.status(400).json({
                errorMessage: "missing required text field"
            })
        }
    }else {
        res.status(400).json({ errorMessage: "missing post data"})
    }
}

const validateUserId = (req, res, next) => {
    const id = req.params.id
    users.getById(id)
    .then((user) => {
        if (user) {
            req.user = user
            next()
        }else {
            res.status(400).json({
                errorMessage: "invalid userId"
            })
        }
    })
    .catch((error) => {
        next(new Error('could not validate this user id'))
    })
}

const validateUser = (req, res, next) => {
    if(req.body) {
        if (req.body.name) {
            next()
        }else{
            res.status(400).json({
                errorMessage: 'missing required name field'
            })
        }
    }else{
        res.status(400).json({
            errorMessage: 'missing user data'
        })
    }
}
module.exports = {
    validatePostId,
     validatePost,
    validateUser, 
    validateUserId}