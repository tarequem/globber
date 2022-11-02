const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const globSchema = new Schema(
  {
    globText: {
      type: String,
      required: 'Type your message',
      minlength: 1,
      maxlength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Glob = model('Glob', globSchema);

module.exports = Glob;
