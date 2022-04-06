import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

//getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: AxiosResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts: [Post] = response.data;
    return res.status(200).json({ message: posts });
  } catch (error) {
    next(error);
  }
};

//getting a single post
const getSinglePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let id: string = req.params.id;
    const response: AxiosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const post: Post = response.data;
    return res.status(200).json({ message: post });
  } catch (error) {
    next(error);
  }
};

//update a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let id: string = req.params.id;
    let title: string = req.body.title;
    let body: string = req.body.body;
    const response: AxiosResponse = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        ...(title && { title }),
        ...(body && { body }),
      }
    );
    const post: Post = response.data;
    return res.status(200).json({ message: post });
  } catch (error) {
    next(error);
  }
};

//add New Post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let title: string = req.body.title;
    let body: string = req.body.body;
    const response: AxiosResponse = await axios.post(
      `https://jsonplaceholder.typicode.com/posts`,
      {
        title,
        body,
      }
    );
    const post: Post = response.data;
    return res.status(200).json({ message: post });
  } catch (error) {
    next(error);
  }
};

//delete a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let id: string = req.params.id;
    const response: AxiosResponse = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    return res.status(200).json({ message: "Post Deleted Sucessfully" });
  } catch (error) {
    next(error);
  }
};

export default { getPosts, getSinglePost, updatePost, addPost, deletePost };
