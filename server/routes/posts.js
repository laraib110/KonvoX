//inside this folder we will write all the routes fpr the posts
import express from 'express';

import { getposts , createPost } from '../controllers/posts.js';

const router = express.Router();
//now we can start ading our routes

//will work on only http://localhost:5000/posts
router.get('/' , getposts);
router.post('/', createPost)

export default router;