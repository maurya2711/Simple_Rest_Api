import express from "express";
import controller from "../controllers/post";

const router = express.Router();

router.get("/posts", controller.getPosts);
router.get("/posts/:id", controller.getSinglePost);
router.put("/posts/:id", controller.updatePost);
router.delete("/posts/:id", controller.deletePost);
router.post("/posts/", controller.addPost);

export = router;
