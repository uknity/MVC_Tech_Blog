const sequelize = require('../config/connection');
const seedUsers = require('./userData' );
const seedPosts = require('./postData');
const seedComments = require('./commentData');
const { Comment, Posts, User  } = require('../models');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  
  await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });

  await Posts.bulkCreate(seedPosts, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(seedComments, {
    individualHooks: true,
    returning: true,
  });
 

  

  process.exit(0);
};

seedAll();

// const sequelize = require('../config/connection');
// const {
//   User,
//   Posts,
//   Comment
// } = require('../models');

// const userData = require('./userData.json');
// const postData = require('./postData.json');
// const commentData = require('./commentData.json');

// const seedDatabase = async () => {
//   await sequelize.sync({
//     force: true
//   });
//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   for (const post of postData) {
//     await Posts.create({
//       ...post,
//       user_id: users[Math.floor(Math.random() * users.length)].user_id,
//     });
//   }

//   for (const comment of commentData) {
//     await Comment.create({
//       ...comment,
//       user_id: users[Math.floor(Math.random() * users.length)].user_id,
//       post_id: post[Math.floor(Math.random() * post.length)].post_id
//     });
//   }

//   await User.bulkCreate(userData);
//   await Posts.bulkCreate(postData);
//   await Comment.bulkCreate(commentData);

//   process.exit(0);
// };

// seedDatabase();