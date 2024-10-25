import Favorite from "../models/favorite.js";

async function findAllFav(req, res) {
  const favorites = await Favorite.findAll();
  res.status(200).json({ favorites });
}

async function addFav(req, res) {
  const name = req.body.name;
  const type = req.body.type;
  const url = req.body.url;

  if (type !== "movie" && type !== "character") {
    return res.status(400).json({
      message:
        '"type" should be either "movie" or "character"',
    });
  }

  const isAvailable = await Favorite.findOne({
    where: {
      name,
      url,
    },
  });

  if (isAvailable) {
    return res
      .status(401)
      .json({ message: "Favorite already exists" });
  }

  const favorite = await Favorite.create({
    name,
    type,
    url,
  });

  if (!favorite)
    res
      .status(404)
      .json({ message: `No record for this id => ${id}` });

  res.status(201).json({ favorite });
}

async function updateFav(req, res) {
  const id = req.params.id;

  const favorite = await Favorite.findByPk(id);
  if (!favorite) {
    return res.status(404).json({
      message: `The data with ID ${id} was not found`,
    });
  }

  const updatedFields = {
    ...(req.body.name && { name: req.body.name }),
    ...(req.body.type && { type: req.body.type }),
    ...(req.body.url && { url: req.body.url }),
  };

  await favorite.update(updatedFields);

  res.status(200).json(favorite);
}

async function deleteFav(req, res) {
  const id = req.params.id;

  const deleted = await Favorite.destroy({ where: { id } });

  if (!deleted) {
    res
      .status(400)
      .json({ message: "Failed to delete record" });
  }

  res.status(200).json({ message: "Record Deleted" });
}

export { findAllFav, addFav, updateFav, deleteFav };
