#include "matrix_walker.h"
#include <iostream>

void matrix_rand_move_naive(naive_matrix_walker *matrix) {
    matrix->teleport((matrix->size() - 1) / 2, (matrix->size() - 1) / 2);
	for (int i; i < 1e7; i++) {
		int r = rand() % 4;
		switch(r){
			case 0:
				matrix->move_up();
				break;
			case 1:
				matrix->move_down();
				break;
			case 2:
				matrix->move_left();
				break;
			case 3:
				matrix->move_right();
				break;
		}
	}
}
void matrix_rand_move_z(z_matrix_walker *matrix) {
    matrix->teleport((matrix->size() - 1) / 2, (matrix->size() - 1) / 2);
	for (int i; i < 1e7; i++) {
		int r = rand() % 4;
		switch(r){
			case 0:
				matrix->move_up();
				break;
			case 1:
				matrix->move_down();
				break;
			case 2:
				matrix->move_left();
				break;
			case 3:
				matrix->move_right();
				break;
		}
	}
}
void matrix_rand_move_hilbert(hilbert_matrix_walker *matrix) {
    matrix->teleport((matrix->size() - 1) / 2, (matrix->size() - 1) / 2);
	for (int i; i < 1e7; i++) {
		int r = rand() % 4;
		switch(r){
			case 0:
				matrix->move_up();
				break;
			case 1:
				matrix->move_down();
				break;
			case 2:
				matrix->move_left();
				break;
			case 3:
				matrix->move_right();
				break;
		}
	}
}

void matrix_row_major_naive(naive_matrix_walker *matrix) {
	matrix->teleport(0, 0);
	for (int i = 0; i < matrix->size() / 2; i++) {
		for (int j = 0; j < matrix->size() - 1; j++) {
			matrix->move_right();
		}
		matrix->move_down();
		for (int j = matrix->size() - 1; j > 0; j--) {
			matrix->move_left();
		}
		matrix->move_down();
	}
}
void matrix_row_major_z(z_matrix_walker *matrix) {
	matrix->teleport(0, 0);
	for (int i = 0; i < matrix->size() / 2; i++) {
		for (int j = 0; j < matrix->size() - 1; j++) {
			matrix->move_right();
		}
		matrix->move_down();
		for (int j = matrix->size() - 1; j > 0; j--) {
			matrix->move_left();
		}
		matrix->move_down();
	}
}
void matrix_row_major_hilbert(hilbert_matrix_walker *matrix) {
	matrix->teleport(0, 0);
	for (int i = 0; i < matrix->size() / 2; i++) {
		for (int j = 0; j < matrix->size() - 1; j++) {
			matrix->move_right();
		}
		matrix->move_down();
		for (int j = matrix->size() - 1; j > 0; j--) {
			matrix->move_left();
		}
		matrix->move_down();
	}
}

void matrix_col_major_naive(naive_matrix_walker *matrix) {
	matrix->teleport(0, 0);
	for (int i = 0; i < matrix->size() / 2; i++) {
		for (int j = 0; j < matrix->size() - 1; j++) {
			matrix->move_down();
		}
		matrix->move_right();
		for (int j = matrix->size() - 1; j > 0; j--) {
			matrix->move_up();
		}
		matrix->move_right();
	}
}
void matrix_col_major_z(z_matrix_walker *matrix) {
	matrix->teleport(0, 0);
	for (int i = 0; i < matrix->size() / 2; i++) {
		for (int j = 0; j < matrix->size() - 1; j++) {
			matrix->move_down();
		}
		matrix->move_right();
		for (int j = matrix->size() - 1; j > 0; j--) {
			matrix->move_up();
		}
		matrix->move_right();
	}
}
void matrix_col_major_hilbert(hilbert_matrix_walker *matrix) {
	matrix->teleport(0, 0);
	for (int i = 0; i < matrix->size() / 2; i++) {
		for (int j = 0; j < matrix->size() - 1; j++) {
			matrix->move_down();
		}
		matrix->move_right();
		for (int j = matrix->size() - 1; j > 0; j--) {
			matrix->move_up();
		}
		matrix->move_right();
	}
}


int main() {
	#ifdef DEBUG
		// run with ```make benchmark DEBUG=1```
		std::cout << "In debug mode!" << std::endl;
	#else
		// run with ```make benchmark``` or ```make benchmark DEBUG = 0```
		std::cout << "In production mode!" << std::endl;
	#endif

	int MATRIX_SIZE = 1000; // must be even
	
	naive_matrix_walker *nm = new naive_matrix_walker(MATRIX_SIZE);
	z_matrix_walker *zm = new z_matrix_walker(MATRIX_SIZE);
	hilbert_matrix_walker *hm = new hilbert_matrix_walker(MATRIX_SIZE);

	fprintf(stderr, "Initializing...\n");
	nm->set_default();
	zm->set_default();
	hm->set_default();

	fprintf(stderr, "Benchmarking naive_matrix_walker...\n");
	matrix_rand_move_naive(nm);
	matrix_row_major_naive(nm);
	matrix_col_major_naive(nm);
	fprintf(stderr, "Benchmarking z_matrix_walker...\n");
	matrix_rand_move_z(zm);
	matrix_row_major_z(zm);
	matrix_col_major_z(zm);
	fprintf(stderr, "Benchmarking hilbert_matrix_walker...\n");
	matrix_rand_move_hilbert(hm);
	matrix_row_major_hilbert(hm);
	matrix_col_major_hilbert(hm);
}
