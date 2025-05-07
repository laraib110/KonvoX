//inside this we are going to use the ulilities of mongoese
import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    //this obj structure will create the compulsory data
    //this specifies thateach post has compulsoray to have these fields
    title: String,
    message: String,
    creator: String,
    tags:[String],
    selectedFile : String,
    likeCount: {
        type:Number,
        default: 0
    },
    createdAt: {
        type:Date,
        default: new Date() 
    }
})

const postMessage = mongoose.model('postMessage' , postSchema);

export default postMessage;