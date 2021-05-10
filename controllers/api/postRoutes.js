const router = require('express').Router();
const { Posts } = require('../../models');

router.delete('/:id', async (req, res) => {
  console.log('you are in delete by id api post routes');
  try {
    const postData = await Posts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get create a post
router.post('/', async (req, res) => {
  try {
    const newPost = await Posts.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});




module.exports = router;
