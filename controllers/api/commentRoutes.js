const router = require('express').Router();
const { Comment, Posts } = require('../../models');

//post new comment by id
router.post('/:id', async (req, res) => {
  console.log('you are in the post comment api route');
  const post_id = req.params.id;
  try {
    const newComment = await Comment.create({
      ...req.body,
      post_id,
      user_id: req.session.user_id,
    });
    // console.log('new comment', newComment);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete comment by id
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
