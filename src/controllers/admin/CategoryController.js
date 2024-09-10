const { createGzip } = require("zlib");
const { Category, SubCategory } = require("../../models");

const { generateSlug } = require("../../utils/generateSlug");
const { Op } = require("sequelize");

const createCategory = async (req, res, next) => {
  try {
    const slug = generateSlug(req.body.name);

    const category = await Category.findOne({ where: { slug } });

    if (category) {
      return res
        .status(404)
        .json({ success: false, message: "category already exists" });
    }

    const created = await Category.create({ ...req.body, slug });

    return res.status(201).json({
      success: true,
      message: "Category created successfuly",
      data: { category: created },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateCatgory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    if (req.body.name) {
      let slug = generateSlug(req.body.name);

      let exists = await Category.findOne({
        where: {
          slug,
          id: {
            [Op.ne]: categoryId,
          },
        },
      });

      if (exists) {
        return res.status(404).json({
          success: false,
          message: "Category Already exists with the given name",
        });
      }
    }

    const category = await Category.findOne({
      where: {
        id: categoryId,
      },
    });

    category.status = req.body.status;
    if (req.body.name) {
      category.name = req.body.name;
      category.slug = generateSlug(req.body.name);
    }

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: { category },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categries = await Category.findAll({
      include: [{ model: SubCategory, as: "subcategories" }],
    });

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: {
        categries,
      },
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    if (!req.params.categoryId) {
      return res.status(400).json({
        success: false,
        message: "Please Provide the Id of the category",
      });
    }
    const category = await Category.findByPk(req.params.categoryId, {
      include: [{ model: SubCategory, as: "subcategories" }],
    });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({
      success: false,
      message: "Category retriewed successfully",
      data: { category },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not exists" });
    }

    await category.destroy();

    return res
      .status(200)
      .json({ success: false, message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCatgory,
  deleteCategory,
};
