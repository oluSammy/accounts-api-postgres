import express from "express";
import {
  createTransaction,
  getUserTransactions,
  getCreditTransactions,
  getDebitTransactions,
} from "../controllers/transactions.controller";

const router = express.Router();

router.post("/", createTransaction);
router.get("/:id", getUserTransactions);
router.get("/credit/:id", getCreditTransactions);
router.get("/debit/:id", getDebitTransactions);

export default router;
