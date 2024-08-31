import express from "express";
import { MovieToSave } from "./movies.types";
import * as database from "./movies.database";
import { StatusCodes } from "http-status-codes";

export const moviesRouter = express.Router();

moviesRouter.get("/test", (_req, res) => {
  res.status(StatusCodes.OK).json("Hola mundo");
});

moviesRouter.get("/movies", async (req, res) => {
  const genre = req.query.genre as string;
  if (genre) {
    const movies = await database.findByGenre(genre);
    if (!movies) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Movies with genre ${genre} not found` });
    }
    return res.status(StatusCodes.OK).json(movies);
  } else {
    const movies = await database.findAll();
    return res.status(StatusCodes.OK).json(movies);
  }
});

moviesRouter.get("/movies/:id", async (req, res) => {
  const movie = await database.findById(Number(req.params.id));

  if (!movie) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `Movie with id ${req.params.id} not found` });
  }

  return res.status(StatusCodes.OK).json(movie);
});

moviesRouter.post("/movies", async (req, res) => {
  const movie = req.body as MovieToSave;
  if (!movie) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `Please provide all the required parameters..` });
  }
  const newMovie = await database.create(req.body);
  return res.status(StatusCodes.CREATED).json(newMovie);
});

moviesRouter.patch("/movies/:id", async (req, res) => {
  const newMovie = await database.update(Number(req.params.id), req.body);
  return res.status(StatusCodes.OK).json(newMovie);
});

moviesRouter.delete("/movies/:id", async (req, res) => {
  const deleteMovie = await database.remove(Number(req.params.id));

  if (!deleteMovie) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `No movie with ID ${req.params.id}` });
  }

  return res.status(StatusCodes.OK).json({ msg: `Movie deleted..` });
});
