import express, { Request, Response } from "express";
import { Movie, MovieToSave } from "./movies.types";
import * as database from "./movies.database";
import { StatusCodes } from "http-status-codes";

export const moviesRouter = express.Router();

moviesRouter.get("/test", (request, response) => {
  return response.status(StatusCodes.OK).json("Hola mundo");
});

moviesRouter.get("/movies", async (request, response) => {
  const movies = await database.findAll();
  return response.status(StatusCodes.OK).json(movies);
});

moviesRouter.get("/movies/:id", async (request, response) => {
  const id = Number(request.params.id);
  const movie = await database.findById(id);
  if (!movie) {
    return response
      .status(StatusCodes.NOT_FOUND)
      .json(`La pelicula con id ${id} no existe`);
  }
  return response.status(StatusCodes.OK).json(movie);
});

moviesRouter.post("/movies", async (request, response) => {
  const movieToSave = request.body;
  const movie = await database.create(movieToSave);
  return response.status(StatusCodes.CREATED).json(movie);
});

moviesRouter.patch("/movies/:id", async (request, response) => {
  const id = Number(request.params.id);
  const movieToSave = request.body;
  const movie = await database.update(id, movieToSave);
  return response.status(StatusCodes.CREATED).json(movie);
});
