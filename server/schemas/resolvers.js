const { AuthenticationError } = require('apollo-server-express');
const { User, Glob } = require('../models');
const { signToken } = require('../utils/auth');

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
          const token = signToken(user);
        
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
        
          if (!user) {
            throw new AuthenticationError('Incorrect credentials');
          }
        
          const correctPw = await user.isCorrectPassword(password);
        
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
        
          const token = signToken(user);
          return { token, user };
        }
    }
  };
  
  module.exports = resolvers;
  