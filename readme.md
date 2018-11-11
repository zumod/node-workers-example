# node-workers-example

## Combinations

The number of combinations requested by this problems is _m_<sup>**n**</sup>. In this case _m_ is 2 ([0, 1]), so the critical point will be the value of **n**, which is the number of the **'\*'** characters in the array.

With a reasonable value for the **n**, a recursive solution will do the job, and in a elegant fashion. With the increasing of **n** the recursive approach will be no longer a solution. If that value is high enough, the time needed for the solving of the problem could be a lifetime and the memory needed will not be enough.

The **divide et impera** dogma comes in handy here: if we find the way to split the main problem in smaller pieces of reusable code and smaller problems we could approach them in a different and more effective way. The idea here was to find the chunk of combinations iteratively and not all of them at once. This way the allocation of memory needed will be nearly constant and predictable while the mole of calculations could be handled separately and in parallel.

The idea here was to use every CPU available and set a thread for each of them in order to balance the load of work among them. When a worker finishes its job with its chunk of combinations, if there are more pending of them, another worker will process the next chunk and replace the values in the original array.

This solution makes the most of a singular workstation working on the problem, but it's not definitive. A further improvement could involve other workstations and other CPUs. The master could handle some of the workers and orchestrate them, but it should delegate the work also to other workers located in other machines that could be easily accessed (_This was the way before NodeJS 10 ndr_).

### Recursive approach

#### Files

- binaryRec.js
- utils.js (_library_)

#### Getting started

```bash
node binaryRec.js
```

### Iterative approach

**NB** The multithread features is new and experimental for NodeJS. It's available only after the version ^10.5. **Use it with caution**. Try it with with the default input provided with the code and eventually increase the number of '\*' gradually to see how it works.

#### Files

- binaryIter/binaryIter.js (main & master of workers)
- binaryIter/worker.js (worker script)
- utils.js (_library_)

#### Getting started

```bash
node --experimental-worker ./binaryIter/binaryIter.js
```

#### Considerations

- Micro and macro improvements for the performance are possible (e.g. for the memory allocated) but this depends
  on the kind of results needed. Log? Number of results? Array? Save of the results remotely?
- Performance improvements could be also achieved with the use of generators and iterators in JS but their implementation will take a while

## Permutations

#### Files

- permutations.js (main & master of workers)
- utils.js (_library_)

#### Getting started

```bash
node permutations.js
```
