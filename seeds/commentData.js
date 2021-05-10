
const { Comment } = require('../models');

const commentData = [
  {
    description: "This post helped a lot.  Thank you.",
    user_id: 2,
    post_id: 2,
  },
  {
    description: "Wow!  Thanks!",
    user_id: 1,
    post_id: 1,
  }
];
console.log(commentData);
const seedComments = () => Comment.Create(commentData);
module.exports = commentData;
