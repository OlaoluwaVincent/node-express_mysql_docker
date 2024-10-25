import express from "express";
import {
  connectToDatabase,
  sequelize,
} from "./sequelize.js";
import {
  addFav,
  deleteFav,
  findAllFav,
  updateFav,
} from "./controllers/favoriteController.js";
import films from "./controllers/filmsController.js";

const PORT = 4000;

const app = express();
app.use(express.json());

app.get("/favorites", findAllFav);
app.post("/favorites", addFav);
app.put("/favorites", updateFav);
app.delete("/favorites", deleteFav);

app.get("/people", films.getPeople);
app.get("/movies", films.getMovies);

// const startServer = async () => {
//   await connectToDatabase();
//   await sequelize.sync({ alter: true });

//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// };

// startServer();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
