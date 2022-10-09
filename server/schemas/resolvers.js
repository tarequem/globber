const { AuthenticationError } = require('apollo-server-express');
const { User, Glob } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('globs')
      
          return userData;
        }
      
        throw new AuthenticationError('Not logged in');
      },
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
        },
        addGlob: async (parent, args, context) => {
          if (context.user) {
            const glob = await Glob.create({ ...args, username: context.user.username });
        
            await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { globs: glob._id } },
              { new: true }
            );
        
            return glob;
          }
        
          throw new AuthenticationError('You need to be logged in!');
        }
    }
  };
  
  module.exports = resolvers;
  