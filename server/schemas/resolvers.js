const { signToken, AuthenticationError } = require("../utils/auth");
const { User } = require("../models");
const { login } = require("../controllers/user-controller");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }
      const foundUser = await User.findOne({
        $or: [
          { _id: context.user ? context.user._id : args.id },
          { username: args.username },
        ],
      });

      if (!foundUser) {
        return { message: "Cannot find a user with this id!" };
      }

      return foundUser;
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);

      if (!user) {
        return { message: "Something is wrong!" };
      }
      const token = signToken(user);
      return { token: token, user: user };
    },

    saveBook: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      console.log(context.user);
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token: token, user: user };
    },
    deleteBook: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }
      console.log(args);
      console.log("context ", context.user._id);
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return { message: "Couldn't find user with this id!" };
      }
      return updatedUser;
    },
  },
};

module.exports = resolvers;
