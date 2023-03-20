const router = require('express').Router()
const { Post, User } = require('../../models')

// /api/post

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: User, 
                attributes: ['name'] 
            }]
        })

        res.status(200).json(postData);
    }
    
 
catch (err) {
  res.status(400).json(err);
}})

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.session.user_id
        })
        res.status(200).json(newPost);
    }
    catch (err) {
        res.status(400).json(err);
}})

router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update({
            title: req.body.title,
            body: req.body.body,
             },
             {
                where: {
                    id: req.params.id
                }
             }
        )
        res.status(200).json(updatedPost);
    }
    catch (err) {
        res.status(400).json(err)
}})

module.exports= router