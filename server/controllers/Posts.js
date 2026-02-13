import Post from "../models/Posts.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";

dotenv.config();

// Get all posts

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};

//  Create Post
export const createPost = async (req, res, next) => {
  try {
    const { name, prompt, photo } = req.body;


    const newPost = await Post.create({
      name,
      prompt,
      photo
    });
    console.log(newPost);

    return res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};
