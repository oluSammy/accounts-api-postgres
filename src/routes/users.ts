import express, { NextFunction, Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUsersById,
  updateUserById,
  deleteUserById,
} from "../controllers/users.controllers";

const router = express.Router();

/* GET users listing. */
router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUsersById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
