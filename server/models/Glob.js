const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const globSchema = new Schema (
    {
        globText: {
            type: String,
            required: "Type your message",
            minlength: 1,
            maxlength: 500
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true 
        }
        //reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

//add a schema for emoji reactions if there is time (similar to other popular messaging apps)

// thoughtSchema.virtual('reactionCount').get(function() {
//     return this.reactions.length;
// });

const Glob = model('Glob', globSchema)

module.exports = Glob;