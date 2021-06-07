const router = require('express').Router();
const apiRoutes = require('./api');
router.use('/api', apiRoutes);

const { Blog, User, Comment } = require('../models');


router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll();
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.send(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

router.get('/dashboard', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    }
    const userBlogData = await Blog.findAll({where: {user_id: req.session.user_id}});

    const blogs = userBlogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', {
        blogs,
        logged_in: req.session.logged_in,
        is_dashboard: true,
    });
});

router.get('/newpost', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    }

    res.render('newpost', {
        logged_in: req.session.logged_in,
    });
});

router.get('/:id', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    }
    const postData = await Blog.findByPk(req.params.id, {
        include: [{
            model: User,
            required: true, // do an INNER Join 
        },
        {
            model: Comment,
            required: false,
            include: [{
                model:User,
                required: false
            }]
        }],
    });
    console.log(postData);
    const post = postData.get({ plain: true });
    console.log(post);
    if (post.user_id === req.session.user_id) {
        console.log("This is my post!!");
        res.render('myblog', {
            post,
            logged_in: req.session.logged_in,
        })
    } else {
        res.render('blog', {
            post,
            logged_in: req.session.logged_in,
        });
    }
});

module.exports = router;