import { Request, Response } from "express";
import TransactionRepo from "../models/transactions.model";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { sender, receiver, amount, description } = req.body;

    const data = await TransactionRepo.create(
      sender,
      receiver,
      amount,
      description
    );

    res.status(201).json({
      message: "Transaction created successfully",
      data,
    });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({
      message: e.message,
    });
  }
};

export const getUserTransactions = async (req: Request, res: Response) => {
  try {
    const data = await TransactionRepo.getTransactionByAcctNumber(
      req.params.id
    );

    res.status(200).json({
      status: "transaction retrieved successfully",
      data,
    });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({
      message: e.message,
    });
  }
};

export const getCreditTransactions = async (req: Request, res: Response) => {
  try {
    const data = await TransactionRepo.getCreditTransactions(req.params.id);

    res.status(200).json({
      status: "transaction retrieved successfully",
      data,
    });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({
      message: e.message,
    });
  }
};

export const getDebitTransactions = async (req: Request, res: Response) => {
  try {
    const data = await TransactionRepo.getDebitTransactions(req.params.id);

    res.status(200).json({
      status: "transaction retrieved successfully",
      data,
    });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({
      message: e.message,
    });
  }
};
