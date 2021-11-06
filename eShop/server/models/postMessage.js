import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    price: String,
    state: String,
    selectedFile: String,
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;