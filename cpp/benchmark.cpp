#include <iostream>

const int ROWS = 10000;
const int COLS = 10000;

int* matrix = (int*) malloc(ROWS * COLS * sizeof(int));

// sets ith entry in matrix to i
void set_matrix_values() {
	for (int i = 0; i < ROWS * COLS; i++) {
		matrix[i] = i;
	}
}


// returns the trace of the matrix
long long trace() {
	long long total = 0L;
	for (int i = 0; i < ROWS; i++) {
		total += matrix[i * COLS + i];
	}
	return total;
}

int main() {
	std::cout << "This is the benchmark example file" << std::endl;

	#ifdef DEBUG
		// run with ```make benchmark DEBUG=1```
		std::cout << "In debug mode!" << std::endl;
	#else
		// run with ```make benchmark``` or ```make benchmark DEBUG = 0```
		std::cout << "In production mode!" << std::endl;
	#endif

	set_matrix_values();
	long long t = trace();
	std::cout << "trace is " << t << std::endl;
}
