const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        if (!userData) {
          res
            .status(400)
            .json({ message: 'Incorrect username or password' });
          return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect username or password' });
          return;
        }
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          
          res.json({ user: userData, message: 'logged in!' });
        });
      } catch (err) {
        res.status(400).json(err);
      }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
    
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
    
          res.status(200).json(userData);
        });
      } catch (err) {
        res.status(400).json(err);
      }
});

router.post('/newpost', async (req, res) => {

  let newPost = req.body;
  newPost.user_id = req.session.user_id;
  console.log(newPost);
  try {
    const blogData = await Blog.create(newPost);
    res.status(200).json(blogData);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.post('/newcomment', async (req, res) => {

  let newComment = req.body;
  newComment.user_id = req.session.user_id;
  console.log(newComment);
  try {
    const commentData = await Comment.create(newComment);
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.put('/updatepost', async (req, res) => {
  console.log(req.body);
  try {
    const blogData = await Blog.update(req.body, {where: {id: req.body.id}});
    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/deletepost', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        blog_id: req.body.id,
      }
    });
    const blogData = await Blog.destroy({
      where: {
        id: req.body.id,
      }
    })
    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);

  }
})

module.exports = router;