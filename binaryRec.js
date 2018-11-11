const { getCombinationsRecursively, replace } = require('./utils');

/**
 * Given an input and an alphabet of chars to replace,
 * it returns all the possible combinations by replacing * with an 0 and 1
 *
 * @param {any[]} input The array of elements that should be parsed
 * @param {string[] | numbers[]} alphabet The array of symbols that should replace the char '*'
 */
const generateCombinationsRecursively = (
  input,
  alphabet = [0, 1],
  target = '*'
) => {
  const indexes = [];
  input.forEach(
    (item, index) => (item === target ? indexes.push(index) : true)
  );

  const nStars = indexes.length;
  const combinations = [];
  getCombinationsRecursively(alphabet, nStars, combinations);

  return replace(input, combinations, indexes);
};

/**
 * Test code
 */
const inputRecursion = ['1', '0', '*', '0', '0', '*', '0'];
const alphabet = [0, 1]; // This could be any set of elements
const results = generateCombinationsRecursively(inputRecursion, alphabet);
console.log(results);
