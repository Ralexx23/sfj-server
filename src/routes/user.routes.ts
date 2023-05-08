import { Router } from "express";
import {
  getUsers,
  postUser,
  putUsers,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers);
router.post("/", postUser);
router.put("/", putUsers);
router.delete("/:id", deleteUser);

export default router;
