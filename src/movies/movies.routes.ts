import express, { Request, Response } from "express";
import { Movie, MovieToSave } from "./movies.types";
import * as database from "./movies.database";
import { StatusCodes } from "http-status-codes";

export const moviesRouter = express.Router();

moviesRouter.get("/test", (_req, res) => {
  res.status(StatusCodes.OK).json("Hola mundo");
});
