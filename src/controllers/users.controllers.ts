import { Response, Request } from "express";
import UsersRepo from "../models/users.model";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, d_o_b, email, phone_number } = req.body;

    const data = await UsersRepo.insert(
      first_name,
      last_name,
      d_o_b,
      email,
      phone_number
    );

    res.status(201).json({ message: "User created", data });
  } catch (e: any) {
    console.log(e);

    res.status(500).json({
      status: "error",
      message: e.message,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await UsersRepo.getAll();

    res.status(200).json({ message: "All users", data: allUsers });
  } catch (e: any) {
    console.log(e);

    res.status(500).json({
      status: "error",
      message: e.message,
    });
  }
};

export const getUsersById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await UsersRepo.findById(+id);

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    res.status(200).json({ message: "User found", data: user });
  } catch (e: any) {
    console.log(e);

    res.status(500).json({
      status: "error",
      message: e.message,
    });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, d_o_b, email, phone_number } = req.body;

    const user = await UsersRepo.findByIdAndUpdate(+id, {
      first_name,
      last_name,
      d_o_b,
      email,
      phone_number,
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    res.status(200).json({ message: "User updated", data: user });
  } catch (e: any) {
    console.log(e);

    res.status(500).json({
      status: "error",
      message: e.message,
    });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await UsersRepo.delete(+id);

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({ message: "User deleted", data: user });
  } catch (e: any) {
    console.log(e);

    res.status(500).json({
      status: "error",
      message: e.message,
    });
  }
};
