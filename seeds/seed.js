const sequelize = require('../config/connection');
const { User, Posts, Comments } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require(`./commentData.json`);

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const comment of commentData) {
    await Comments.create({
      ...comment,
      post_id: post[Math.floor(Math.random() * post.length)].id
    });
  }
  // const comments = await Comments.bulkCreate(commentData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Posts.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
