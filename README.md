# matrix-walker
We implement a 2d and 3d cache oblivious NxN matrix storage, inspired by ps5. Our solution involves storing elements on disk in order of so-called “pseudo-Hilbert curves” (finite approximations of Hilbert’s space-filling curve), with padding for matrices of size not a power of two. We plan to explore generalizations of our data structure to $k$dimensional tensors and evaluate the cache performance of these using theoretical analysis and experiments.

The deliverables of our project include:

- code implementing a cache-oblivious $N\times N$ matrix using Hilbert and Z-indexing and their generalizations to higher dimensional tensors
- analysis on asymptotic behavior (runtime and cache misses) of a generalized $k$ dimensional tensor version of the data structure
- visualizing the cache and block accesses for small number of dimensions (definitely 2, maybe 3)
- benchmarking our implementation by counting cache misses in normal operations (teleport, move, get)

## compiling c++ with make

For any c++ file, a production version can be compiled using make. To compile ```benchmark.cpp``` or ```test_matrix_walker.cpp``` run ```make benchmark``` and ```make test_matrix_walker``` respectively. To run a debug version append the argument ```DEBUG=1```, which will include any bits of DEBUG code written. Often when building a binary, make will say there's nothing to be built (happens when the binary is built for DEBUG=1 after building it right before). So it's always good to run ```make clean``` right before this to remove the binaries.

## profiling the code

To profile the code run ```perf record BINARY_NAME``` followed by ```perf report```. This gives some interesting statistics regarding what percent of execution time is spent in each chunk of the code.

### timing and more stats

For more stats do ```perf stat BINARY_NAME```. More command line arguments / flags can be used to specify what stats to display.

### mememory leaks

To check for memory leaks / memory behavior, we use valgrind. To check for memory leaks use ```valgrind BINARY_NAME```.

### cache data

To view cache behavior run ```valgrind --tool=cachegrind BINARY_NAME``` 
