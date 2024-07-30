const { Restaurant } = require("../../models");
const asyncHandler = require("../../utils/AsyncHandler");
const { generateSlug } = require("../../utils/functions");
const { client } = require("../../services/redis");

const create = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const slug = generateSlug(name);
  console.log(slug);
  const exists = await Restaurant.findOne({
    where: {
      slug: slug,
    },
  });

  if (exists) {
    return res
      .status(404)
      .json({ success: false, message: "Restaurant already exists" });
  }

  const restaurant = await Restaurant.create({
    name,
    slug,
    ...req.body,
  });
  res.status(201).json({
    success: true,
    message: "Restaurant created successfully",
    restaurant,
  });
});

const getAll = asyncHandler(async (req, res, next) => {
  const rests = await client.get("restaurants");
  if (rests) {
    return res.status(200).json({
      success: true,
      message: "Restaurants fetched successfully",
      data: JSON.parse(rests),
    });
  }
  const data = await Restaurant.findAll({ where: { status: "Active" } });
  await client.set("restaurants", JSON.stringify(data));
  res
    .status(200)
    .json({ success: true, message: "Restaurants fetched successfully", data });
});

const getBySlug = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findOne({
    where: { slug: req.params.slug },
  });

  if (!restaurant) {
    return res
      .status(404)
      .json({ success: false, message: "Restaurant not found" });
  }

  res.status(200).json({
    success: true,
    message: "Restaurant fetched successfully",
    data: restaurant,
  });
});

const update = asyncHandler(async (req, res, next) => {
  const rest = await Restaurant.findOne({ where: { slug: req.params.slug } });
  if (!rest) {
    return res
      .status(404)
      .json({ success: false, message: "Resturant not found" });
  }
  await res.update(req.body);
  res.status(200).json({
    success: true,
    message: "restaurant updated successfully",
    data: rest,
  });
});

const deleteRest = asyncHandler(async (req, res, next) => {
  const rest = await Restaurant.findOne({ where: { slug: req.params.slug } });
  if (!rest) {
    return res
      .status(404)
      .json({ success: false, message: "Resturant not found" });
  }
  await res.destroy();
  res
    .status(204)
    .json({ success: true, message: "Restaurant deleted successfully" });
});
module.exports = { create, getAll, getBySlug, update, deleteRest };
