/**
 * It returns all the combinations, given an alphabet and number of elements to combine
 *
 * @param {any[]} alphabet The list of characters to replace, it's the n in the n^m formula
 * @param {number} n
 * @param {string[]} combinations It's the list of combination itself
 * @param {string} word It keeps track of the combination generated
 */
const getCombinationsRecursively = (
  alphabet = [0, 1],
  n,
  combinations,
  word = ''
) => {
  n === 0
    ? combinations.push(word)
    : alphabet.forEach(char =>
        getCombinationsRecursively(
          alphabet,
          n - 1,
          combinations,
          `${word}${char}`
        )
      );
};

/**
 *
 * @param {number} i The head of the chunk of combinations to get
 * @param {number} limit The tale of the chunk
 * @param {number} n The total number of combinations
 */
const getCombinationsIteratively = (i, limit, n) => {
  const combinations = [];

  for (; i < limit; i++) {
    const binaryValue = i.toString(2);
    combinations.push(binaryValue.padStart(n, '0'));
  }

  return combinations;
};

/**
 * It gets an array of lists and returns all the permutations between the lists
 *
 * Maybe in the future we could use this experimental JS feature (flatmap), let's imagine
 * the following as a polyfill
 *
 * @param {any[]} list The array of lists of which obtain the product
 * @param {string} product It keeps track of the product
 * @return {string[]}
 */
const cartesianProduct = (lists, product = '') =>
  lists.length === 0
    ? product
    : lists[0].reduce(
        (accumulator, currentValue) =>
          accumulator.concat(
            cartesianProduct(lists.slice(1), `${product}${currentValue}`)
          ),
        []
      );

/**
 * It replaces the * with the respective 0-1 chars for each combination available,
 * then it returns the all the replaced strings
 *
 * @param {string[]} input The original array of strings
 * @param {string[]} combinations Chunk of combinations of 01 that should replace the * at a given position
 * @param {number[]} indexes It contains the indexes of the target chars in the input array
 */
const replace = (input, combinations, indexes) => {
  const combinationsLength = combinations.length;
  const results = [];
  for (let i = 0, j, inputCopy; i < combinationsLength; i++) {
    inputCopy = [...input];
    j = 0;

    indexes.forEach(index => {
      inputCopy[index] = combinations[i].charAt(j);
      j++;
    });

    results.push(inputCopy.join(''));
  }
  return results;
};

module.exports = {
  getCombinationsRecursively,
  getCombinationsIteratively,
  cartesianProduct,
  replace
};
