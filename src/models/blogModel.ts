import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        unique: true
    },
    summContent: {
        type: String,
        required: [true, "Please provide a summary content"],
    },
    content: {
        type: String,
        required: [true, "Please provide content"]
    },
    category: {
        type: String,
        required: [true, "Please provide a category"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    author: {
        type: String,
        ref: "users",
    }
});

const Blog = mongoose.models.blogs || mongoose.model("blogs", blogSchema);

export default Blog;