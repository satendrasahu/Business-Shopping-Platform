
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
//const date = require('date-and-time');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String

    },
    description: {
        type: String
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        require: true,
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [{
        text: String,
        postedBy: { type: ObjectId, ref: "User" }
    }],
    postedBy: {
        type: ObjectId,
        ref: "User"
    },

}, { timestamps: true })


mongoose.model("Post", postSchema);