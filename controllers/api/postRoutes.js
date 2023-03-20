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
             })
             if (!updatedPost) {
                res.status(404).json({ message: 'No post found with this id!' });
                return;
              }
        res.status(200).json(updatedPost);
    }
    catch (err) {
        res.status(400).json(err)
}})

router.delete('/:id', async (req, res) => {
    // delete one product by its `id` value
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id
        }
      });
      if (!postData) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports= router