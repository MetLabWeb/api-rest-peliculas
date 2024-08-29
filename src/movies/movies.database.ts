import { MovieToSave, Movie } from "./movies.types";
import fs from "fs";

let movies: Movie[] = loadMoviesFromFile();

function loadMoviesFromFile(): Movie[] {
  try {
    const data = fs.readFileSync("./movies.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(`Error ${error}`);
    return [];
  }
}

function saveMoviesInFile() {
  try {
    fs.writeFileSync("./movies.json", JSON.stringify(movies), "utf-8");
    console.log("Movies saved successfully!");
  } catch (error) {
    console.log("Error", error);
  }
}

export const findAll = async (): Promise<Movie[]> => movies;

export const findById = async (id: number): Promise<Movie> => movies[id];

export const create = async (
  movieToSave: MovieToSave
): Promise<null | Movie> => {
  const newId = movies[movies.length].id + 1;
  const newMovie = {
    id: newId,
    ...movieToSave,
  };

  movies = [...movies, newMovie];

  saveMoviesInFile();

  return movies[newId];
};

export const update = async (
  id: number,
  updateValues: MovieToSave
): Promise<Movie | null> => {
  const movie = await findById(id);

  if (!movie) {
    return null;
  }

  movies[id] = {
    id,
    ...updateValues,
  };

  saveMoviesInFile();

  return movies[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const movie = await findById(id);

  if (!movie) {
    return null;
  }

  delete movies[id];

  saveMoviesInFile();
};
