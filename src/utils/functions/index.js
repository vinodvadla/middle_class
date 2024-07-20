const generateSlug = (name) => {
  return name.trim("").toLowerCase().trim().replace(" ", "");
};

module.exports = { generateSlug };
