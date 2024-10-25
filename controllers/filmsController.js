import axios from "axios";

const baseUrl = "https://swapi.dev/api";

async function getMovies(req, res) {
  try {
    const movies = await axios.get(baseUrl + "/films");
    res.status(200).json({ movies: movies.data });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Failed to get records" });
  }
}

async function getPeople(req, res) {
  try {
    const people = await axios.get(baseUrl + "/people");
    res.status(200).json({ people: people.data });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Failed to get records" });
  }
}

export default { getMovies, getPeople };
