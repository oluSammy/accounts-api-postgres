import express from "express";
import {
  getBalanceByAcctNumber,
  getBalanceByUserId,
  getAllBalances,
} from "../controllers/balance.controller";

const router = express.Router();

router.get("/acctNumber/:id", getBalanceByAcctNumber);
router.get("/user-id/:id", getBalanceByUserId);
router.get("/", getAllBalances);

export default router;
