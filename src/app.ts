import express from "express";
import * as dotevnv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { moviesRouter } from "./movies/movies.routes";

dotevnv.config();

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use("/", moviesRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
