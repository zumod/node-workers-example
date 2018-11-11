const { cartesianProduct } = require('./utils');

/**
 * Given an array of lists it returns all the permutations between the lists
 *
 * @param {<string[] | number[]>[]} input The array of lists
 */
const getPermutations = input => {
  return cartesianProduct(input);
};

/**
 * test code
 */
const input = [[1, 3], ['a'], [4, 5]];
const results = getPermutations(input);
console.log(results);
