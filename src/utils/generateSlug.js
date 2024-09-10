const generateSlug = (str) => {
  return str.trim().toLowerCase().replace(/\s+/g, "");
};
module.exports = { generateSlug };
