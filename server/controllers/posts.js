import express from 'express'; 
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import User from '../models/user.js';
const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // 🔍 fetch user name from DB
    if (!user) return res.status(404).json({ message: 'User not found' });

    const post = new PostMessage({
      ...req.body,
      creator: user.name,      // ✅ use name from DB
      creatorId: req.userId,   // ✅ still use ID from token
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error('Post creation error:', error);
    res.status(409).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const existingPost = await PostMessage.findById(id);
    if (existingPost.creatorId !== req.userId) {
        return res.status(403).json({ message: 'Not authorized to update this post.' });
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { ...post, _id: id }, { new: true });
    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }

    const existingPost = await PostMessage.findById(id);
    if (existingPost.creatorId !== req.userId) {
        return res.status(403).json({ message: 'Not authorized to delete this post.' });
    }

    try {
        await PostMessage.findByIdAndDelete(id);
        res.json({ message: 'Post deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.status(401).json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
};

export default router;
