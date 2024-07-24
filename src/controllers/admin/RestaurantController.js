const { Restaurant } = require("../../models");
const asyncHandler = require("../../utils/AsyncHandler");
const { generateSlug } = require("../../utils/functions");

const create = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  console.log(req.body);
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

module.exports = { create };
