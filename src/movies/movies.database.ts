import { MovieToSave, Movie } from "./movies.types";
import fs from "fs";

// INIT MOVIES
let movies: Movie[] = loadMoviesFromFile();

// LOAD AND SAVE MOVIES IN FILE
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

// FIND METHODS
export const findAll = async (): Promise<Movie[]> => movies;

export const findById = async (id: number): Promise<Movie | undefined> =>
  movies.find((movie) => movie.id === id);

export const findByGenre = async (genre: string): Promise<Movie | undefined> =>
  movies.find((movie) => movie.genre.includes(genre));

// CREATE & EDIT METHODS
export const create = async (
  movieToSave: MovieToSave
): Promise<null | Movie> => {
  const newId = movies[movies.length - 1].id + 1;

  const newMovie = {
    id: newId,
    ...movieToSave,
  };

  movies = [...movies, newMovie];

  saveMoviesInFile();
  const nexIndex = movies.length - 1;

  return movies[nexIndex];
};

export const update = async (
  id: number,
  updateValues: MovieToSave
): Promise<Movie | null> => {
  let indexToEdit = 0;
  const movie = movies.find((movie, index) => {
    if (movie.id === id) {
      indexToEdit = index;
      return true;
    } else {
      return false;
    }
  });

  if (!movie) {
    return null;
  }

  movies[indexToEdit] = {
    ...movie,
    ...updateValues,
  };

  saveMoviesInFile();

  return movies[indexToEdit];
};

// REMOVE METHOD
export const remove = async (id: number): Promise<null | true> => {
  let indexToRemove = 0;

  const movie = movies.find((movie, index) => {
    if (movie.id === id) {
      indexToRemove = index;
      return true;
    } else {
      return false;
    }
  });

  console.log("movie", movie);
  console.log("index", indexToRemove);

  if (!movie) {
    return null;
  }

  movies.splice(indexToRemove, 1);

  saveMoviesInFile();

  return true;
};
