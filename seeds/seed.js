const sequelize = require('../config/connection');
const { User, Posts, Comments } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require(`./commentData.json`);

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // for (const comment of commentData) {
  //   await Comments.create({
  //     ...comment,
  //     post_id: post[Math.floor(Math.random() * post.length)].id
  //   });
  // }
  

   await User.bulkCreate(userData);
   await Posts.bulkCreate(postData);
   await Comments.bulkCreate(commentData);
  


  // const comments = await Comments.bulkCreate(commentData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  process.exit(0);
};

seedDatabase();
