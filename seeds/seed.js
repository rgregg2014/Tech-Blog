//===============================================REQUIRES
const sequelize = require("../config/connection");
const { User, Post } = require("../models");

const userSeedData = require("./userSeed.json");
const postSeedData = require("./postSeed.json");

//=============================================PRIMARY FUNCTION
const seedAll = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedData);

  for (const post of postSeedData) {
    const newPost = await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  process.exit(0);
};

//=============================================INITIALIZE
seedAll();
