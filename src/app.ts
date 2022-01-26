import createError, { HttpError } from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import Pool from "./database/db";

// DATABASE_URL=postgres://samuelolumorin@localhost:5432/accounts npm run migrate up
/* npm run migrate create rename contents to body */
//postgres://iaehnpijvklsex:7f5ca09a76499b93b86201ed4c201d1254f048f5ec3991a2b53f9df27c33f19a@ec2-34-205-209-14.compute-1.amazonaws.com:5432/da6ltm7kh5038b npm run migrate up

import indexRouter from "./routes/index";

const app = express();

dotenv.config();

// connect to database

if (process.env.NODE_ENV !== "test") {
  Pool.connect({
    user: process.env.PG_USER as string,
    database: process.env.PG_DB_NAME as string,
    password: process.env.PG_PASSWORD as string,
    host: process.env.PG_HOST as string,
    port: +(process.env.PG_PORT as string),
  })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Error connecting to database", err);
    });
}

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
