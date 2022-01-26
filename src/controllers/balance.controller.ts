import { Request, Response } from "express";
import BalanceRepo from "../models/balance.model";

export const getBalanceByAcctNumber = async (req: Request, res: Response) => {
  try {
    const data = await BalanceRepo.getBalanceByAcctNumber(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Balance not found",
      });
    }

    res.status(200).json({ message: "Balance found", data });
  } catch (e: any) {
    res.status(500).json({
      status: "error",
      message: e.message,
    });
  }
};

export const getBalanceByUserId = async (req: Request, res: Response) => {
  try {
    const data = await BalanceRepo.getBalanceByUserId(+req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Balance not found",
      });
    }

    res.status(200).json({ message: "Balance found", data });
  } catch (e: any) {
    res.status(500).json({
      status: "error",
      message: e.message,
    });
  }
};

export const getAllBalances = async (req: Request, res: Response) => {
  try {
    const data = await BalanceRepo.getAllBalances();

    res.status(200).json({ message: "All balances", data });
  } catch (e: any) {
    res.status(500).json({
      status: "error",
      message: e.message,
    });
  }
};
