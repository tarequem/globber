const { AuthenticationError } = require('apollo-server-express');
const { User, Glob } = require('../models');
const { signToken } = require('../utils/auth');
const { PubSub } = require('graphql-subscriptions');
const GLOBE_ADDED = 'GLOBE_ADDED';

const pubsub = new PubSub();

const resolvers = {
  Query: {
    // Get Logged In User
    loggedInUser: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          '-__v -password'
        );
        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    // Get All Users
    users: async (parent, args, context) => {
      if (context.user) {
        return User.find({ _id: { $ne: context.user._id } }).select(
          '-__v -password'
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Get A User
    user: async (parent, { email }, context) => {
      if (context.user) {
        return await User.findOne({ email }).select('-__v -password');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Get All Messages from a specific User
    globs: async (parent, { receiverId }, context) => {
      if (context.user) {
        return Glob.find({
          $or: [
            {
              receiverId: { $eq: receiverId },
              senderID: { $eq: context.user._id },
            },
            {
              senderID: { $eq: receiverId },
              receiverId: { $eq: context.user._id },
            },
          ],
        }).sort({ createdAt: 1 });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    glob: async (parent, { _id }) => {
      return Glob.findOne({ _id });
    },
  },
  Mutation: {
    // User SignUp
    addUser: async (parent, args) => {
      const { name, email, password } = args;

      if (password.length < 8) {
        throw new AuthenticationError(
          'Password Length should be greater than 8'
        );
      }
      //If User Already Exists
      const userExists = await User.findOne({ email });

      if (!userExists) {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
      }

      throw new AuthenticationError('User Exists');
    },
    // User Login
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
    // Create a Globe
    addGlob: async (parent, args, context) => {
      if (context.user) {
        const glob = await Glob.create({
          ...args,
          senderId: context.user._id,
          senderUserName: context.user.username,
          senderUserEmail: context.user.email,
        });

        // publishing the event
        pubsub.publish(GLOBE_ADDED, { globeAdded: glob });
        return glob;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Subscription: {
    globeAdded: {
      // Listening to the EVENT
      subscribe: () => pubsub.asyncIterator(GLOBE_ADDED),
    },
  },
};

module.exports = resolvers;
