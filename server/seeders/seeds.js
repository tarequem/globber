// const faker = require('faker');
const userSeeds = require('./userSeed.json');
const globSeeds = require('./globSeed.json');
const db = require('../config/connection');
const { Glob, User } = require('../models');

db.once('open', async () => {
  try {
    await Glob.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < globSeeds.length; i++) {
      const { _id, globAuthor } = await Glob.create(globSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: globAuthor },
        {
          $addToSet: {
            globs: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
