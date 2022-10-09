const { User, Glob } = require('../models');


const resolvers = {
    Query: {
      users: async () => {
        return User.find()
          .select('-__v -password')
          .populate('globs')
      },
      user: async (parent, { username }) => {
        return User.findOne({ username })
          .select('-__v -password')
          .populate('globs');
      },
      globs: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Glob.find(params).sort({ createdAt: -1 });
      },
      glob: async (parent, { _id }) => {
        return Glob.findOne({ _id });
      }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
          
            return user;
        },
        login: async () => {
    
        }
    }
  };
  
  module.exports = resolvers;
  