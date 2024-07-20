const Joi = require("joi");
const restaurant = require("../../models/restaurant");

const Resschema = Joi.object({
  name: Joi.string().required().min(3),
  city: Joi.string().required(),
  address: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  mobile: Joi.string().required(),
  description: Joi.string().required(),
});

const validate = (schema) => {
  return async (req, res, next) => {
    const { error } = await schema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

module.exports = { validate, restaurantSchema: Resschema };

// name: DataTypes.STRING,
// city: DataTypes.STRING,
// address: DataTypes.STRING,
// status: DataTypes.STRING,
// email: DataTypes.STRING,
// password: DataTypes.STRING,
// mobile: DataTypes.STRING,
// descrition: {
//   type: DataTypes.TEXT,
// },
// slug: {
//   type: DataTypes.STRING,
//   unique: true,
//   validate: {
//     isLowercase: true,
//   },
// },
