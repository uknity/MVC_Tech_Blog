const sequelize = require('../config/connection');
const { User, Posts, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  
    for (const post of postData) {
      await Posts.create({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    };

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      post_id: post[Math.floor(Math.random() * post.length)].id
    });
  };

   await User.bulkCreate(userData);
   await Posts.bulkCreate(postData);
   await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
