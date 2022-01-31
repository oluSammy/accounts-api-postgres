import express, { NextFunction, Request, Response } from "express";
import usersRouter from "./users";
import balanceRouter from "./balance.routes";
import transactionRouter from "./transaction.routes";

const router = express.Router();

router.use("/", (__: Request, res: Response) => {
  res.send("Api is live 🚀");
});
router.use("/users", usersRouter);
router.use("/balance", balanceRouter);
router.use("/transaction", transactionRouter);

export default router;
