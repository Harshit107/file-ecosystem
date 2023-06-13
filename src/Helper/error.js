

module.exports = function validate(value) {
  if (value === undefined || value === "") return false;

  return true;
};