const { Posts } = require('../models');

const postData = [
    {
      title: "Middleware",
      description: "Middleware helps to bridge the gap between users, applications, and data. ",
      user_id: 2
    },
    {
      title: "Promises Using Async and Await",
      description: "When you type 'async' before a function, it returns a value when the promise is fulfilled. When you add 'await' to the promise, it allows the function to complete when the promise is resolved.",
      user_id: 1
    }
  ]

  const seedPosts = () => Posts.bulkCreate(postData);

module.exports = postData;