const router = require('express').Router();
const { Posts, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Posts.findAll({
      include: [
        {
          model: Comments,
          attributes: ['name', 'description'],
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    //serialize the data so the template can read it
    const posts = postData.map((post) =>
      post.get({ plain: true })
    );
      

    //pass serialized data and session flag into the template
    console.log(posts);
    
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: Comments,
          attributes: [
            'id',
            'name',
            'description',
            'date_created',
          ],
        },
      ],
    });

    const post = postData.get({ plain: true });
    res.render('post', { ...post, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Posts }],
    });

    const user = userData.get({ plain: true});

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;
