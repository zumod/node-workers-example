/**
 * This is the script file of the worker. It's executed each time
 * that the master create a new worker
 */
const { workerData, parentPort } = require('worker_threads');
const { getCombinationsIteratively, replace } = require('../utils');

// Start: get the shared data
const { i, k, limit, n, input, indexes } = workerData;
console.log(`Thread ${i} will process ${k * i}-${limit} combinations`);

const combinations = getCombinationsIteratively(k * i, limit, n); // Get a specific chunk of combinations
const results = replace(input, combinations, indexes); // Replace the '*' with 0-1 for all the combinations obtained

// Send the results to the master
parentPort.postMessage({
  results
});
