const { Worker } = require('worker_threads');
const numCPUs = require('os').cpus().length;

/**
 * Test code
 */
const input = [
  '1',
  '0',
  '*',
  '*',
  '0',
  '*',
  '0',
  '*',
  '*',
  '*',
  '*',
  '*',
  '*',
  '*',
  '*',
  '*'
];
const alphabet = [0, 1]; // This could be any set of elements
const target = '*';

// Multithread code start here
// Count all the '*' chars and keep track of their positions
const indexes = [];
input.forEach((item, index) => (item === target ? indexes.push(index) : true));
const n = indexes.length;

// Critical point of the problem (n^m) let's see the number of combinations here
const nCombinations = Math.pow(alphabet.length, n);
console.log(`${nCombinations} found...`);

// Shared vars in multithreading
var i = 0;
var j = 1;
var k = 1000000; // This is arbitrary 100 * 100 * 100 it's usually a good compromise
var cpusAvailable = numCPUs;
var limit;
var replaced = 0;

// Depending on the nCombinations split the load in threads but only among the cpus available
while (cpusAvailable > 0 && limit !== nCombinations) {
  limit = k * j < nCombinations ? k * j : nCombinations;
  startWorker(n, input, indexes, limit);
  i++;
  j++;
}

/**
 * Launched from the master or another worker. It create a worker passing the shared data
 * to it and eventually it handles the messages received and several events
 *
 * @param {number} n The number of *
 * @param {string[]} input The initial array of char used as blueprint
 * @param {number[]} indexes The array that contains the indexes of the * in the input array
 */
function startWorker(n, input, indexes) {
  cpusAvailable--;

  // Create the worker and pass the data
  const worker = new Worker(__dirname + '/worker.js', {
    workerData: {
      i,
      k,
      limit,
      n,
      input,
      indexes
    }
  });

  // The workers will only notify their results here. Take note of the progress and
  // Start the next step with another chunk of combos if needed
  worker.on('message', msg => {
    cpusAvailable++;
    replaced += msg.results.length;
    console.log(`${replaced} combinations processed`);

    if (limit === nCombinations) {
      return;
    }

    i++;
    j++;
    limit = k * j < nCombinations ? k * j : nCombinations;

    if (cpusAvailable) {
      startWorker(n, input, indexes);
    }
  });
  worker.on('error', console.error);
  worker.on('exit', code => {
    if (code !== 0)
      console.error(Error(`Worker stopped with exit code ${code}`));
  });
}
