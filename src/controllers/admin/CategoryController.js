const { Category } = require("../../models");
const asyncHandler = require("../../utils/AsyncHandler");
const { generateSlug } = require("../../utils/functions/index");

const createCategory = asyncHandler(async (req, res, next) => {
  const slug = generateSlug(req?.body?.name);
  const category = await Category.findOne({
    where: { slug },
  });
  if (category) {
    return res
      .status(404)
      .json({ success: false, message: "Category already exists" });
  }
  const created = await Category.create({ ...req.body, slug });
  return res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: created,
  });
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ where: { slug: req.body.slug } });
  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "Category not exists" });
  }

  await category.destroy();
  res
    .status(204)
    .json({ success: true, message: "Category destroyed successfully" });
});

const updateCategory = asyncHandler(async (req, res, next) => {
  const exists = await Category.findOne({ where: { slug: req.body.slug } });
  if (!exists) {
    return res
      .status(404)
      .json({ success: false, message: "Category not exists" });
  }
  if (req.body?.name != exists.name) {
    let slug = generateSlug(req.body.name);
    req.body.slug = slug;
  }
  await exists.update(req.body);

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: exists,
  });
});

const getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.findAll();
  return res.status(200).json({
    success: true,
    message: "Categories fetched successfully",
    data: categories,
  });
});

const getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ where: { slug: req.params.slug } });
  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "Category not found" });
  }
  res.status(200).json({
    success: true,
    message: "Category fetched successfully",
    data: category,
  });
});
module.exports = {
  createCategory,
  deleteCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
};
