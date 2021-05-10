const router = require('express').Router();
const { User } = require('../../models');

//create a new user
router.post('/', async (req, res) => {
  // console.log(req.body);
  // console.log("you're in api user sign up/ to create a post");
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    
    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//login route
router.post('/login', async (req, res) => {
  // console.log('you are in the api user login route');
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    // console.log(userData);

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      // console.log('Im in req.session.save');
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;
      // console.log(userData.user_id);
      // console.log(req.session.user_id);
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//logout route
router.post('/logout', (req, res) => {
  // console.log('You made it to the logout function');
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
