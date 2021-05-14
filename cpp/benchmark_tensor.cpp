#include "tensor_walker.h"
#include <iostream>

void tensor_rand_move_naive(tensor_walker *tensor) {
    tensor->teleport((tensor->size() - 1) / 2, (tensor->size() - 1) / 2, (tensor->size() - 1) / 2);
	for (int i; i < 1e7; i++) {
		int r = rand() % 6;
		switch(r){
			case 0:
				tensor->move_up();
				break;
			case 1:
				tensor->move_down();
				break;
			case 2:
				tensor->move_left();
				break;
			case 3:
				tensor->move_right();
				break;
			case 4:
				tensor->move_in();
				break;
			case 5:
				tensor->move_out();
				break;
		}
	}
}
void tensor_rand_move_z(tensor_walker *tensor) {
    tensor->teleport((tensor->size() - 1) / 2, (tensor->size() - 1) / 2, (tensor->size() - 1) / 2);
	for (int i; i < 1e7; i++) {
		int r = rand() % 6;
		switch(r){
			case 0:
				tensor->move_up();
				break;
			case 1:
				tensor->move_down();
				break;
			case 2:
				tensor->move_left();
				break;
			case 3:
				tensor->move_right();
				break;
			case 4:
				tensor->move_in();
				break;
			case 5:
				tensor->move_out();
				break;
		}
	}
}
void tensor_rand_move_hilbert(tensor_walker *tensor) {
    tensor->teleport((tensor->size() - 1) / 2, (tensor->size() - 1) / 2, (tensor->size() - 1) / 2);
	for (int i; i < 1e7; i++) {
		int r = rand() % 6;
		switch(r){
			case 0:
				tensor->move_up();
				break;
			case 1:
				tensor->move_down();
				break;
			case 2:
				tensor->move_left();
				break;
			case 3:
				tensor->move_right();
				break;
			case 4:
				tensor->move_in();
				break;
			case 5:
				tensor->move_out();
				break;
		}
	}
}

void tensor_ijk_order_naive(tensor_walker *tensor) {
	tensor->teleport(0, 0, 0);
	for (int i = 0; i < tensor->size() / 2; i++) {
		for (int j = 0; j < tensor->size() / 2; j++) {
			for (int k = 0; k < tensor->size() - 1; k++) {
				tensor->move_right();
			}
			tensor->move_down();
			for (int k = tensor->size() - 1; k > 0; k--) {
				tensor->move_left();
			}
			tensor->move_down();
		}
		tensor->move_out();
		for (int j = 0; j < tensor->size() / 2; j++) {
			for (int k = 0; k < tensor->size() - 1; k++) {
				tensor->move_right();
			}
			tensor->move_up();
			for (int k = tensor->size() - 1; k > 0; k--) {
				tensor->move_left();
			}
			tensor->move_up();
		}
		tensor->move_out();
	}
}
void tensor_ijk_order_z(tensor_walker *tensor) {
	tensor->teleport(0, 0, 0);
	for (int i = 0; i < tensor->size() / 2; i++) {
		for (int j = 0; j < tensor->size() / 2; j++) {
			for (int k = 0; k < tensor->size() - 1; k++) {
				tensor->move_right();
			}
			tensor->move_down();
			for (int k = tensor->size() - 1; k > 0; k--) {
				tensor->move_left();
			}
			tensor->move_down();
		}
		tensor->move_out();
		for (int j = 0; j < tensor->size() / 2; j++) {
			for (int k = 0; k < tensor->size() - 1; k++) {
				tensor->move_right();
			}
			tensor->move_up();
			for (int k = tensor->size() - 1; k > 0; k--) {
				tensor->move_left();
			}
			tensor->move_up();
		}
		tensor->move_out();
	}
}
void tensor_ijk_order_hilbert(tensor_walker *tensor) {
	tensor->teleport(0, 0, 0);
	for (int i = 0; i < tensor->size() / 2; i++) {
		for (int j = 0; j < tensor->size() / 2; j++) {
			for (int k = 0; k < tensor->size() - 1; k++) {
				tensor->move_right();
			}
			tensor->move_down();
			for (int k = tensor->size() - 1; k > 0; k--) {
				tensor->move_left();
			}
			tensor->move_down();
		}
		tensor->move_out();
		for (int j = 0; j < tensor->size() / 2; j++) {
			for (int k = 0; k < tensor->size() - 1; k++) {
				tensor->move_right();
			}
			tensor->move_up();
			for (int k = tensor->size() - 1; k > 0; k--) {
				tensor->move_left();
			}
			tensor->move_up();
		}
		tensor->move_out();
	}
}

void tensor_kji_order_naive(tensor_walker *tensor) {
	tensor->teleport(0, 0, 0);
	for (int k = 0; k < tensor->size() / 2; k++) {
		for (int j = 0; j < tensor->size() / 2; j++) {
			for (int i = 0; i < tensor->size() - 1; i++) {
				tensor->move_out();
			}
			tensor->move_down();
			for (int i = tensor->size() - 1; i > 0; i--) {
				tensor->move_in();
			}
			tensor->move_down();
		}
		tensor->move_right();
		for (int j = 0; j < tensor->size() / 2; j++) {
			for (int i = 0; i < tensor->size() - 1; i++) {
				tensor->move_out();
			}
			tensor->move_up();
			for (int i = tensor->size() - 1; i > 0; i--) {
				tensor->move_in();
			}
			tensor->move_up();
		}
		tensor->move_right();
	}
}
void tensor_kji_order_z(tensor_walker *tensor) {
	tensor->teleport(0, 0, 0);
	for (int k = 0; k < tensor->size() / 2; k++) {
		for (int j = 0; j < tensor->size() / 2; j++) {
			for (int i = 0; i < tensor->size() - 1; i++) {
				tensor->move_out();
			}
			tensor->move_down();
			for (int i = tensor->size() - 1; i > 0; i--) {
				tensor->move_in();
			}
			tensor->move_down();
		}
		tensor->move_right();
		for (int j = 0; j < tensor->size() / 2; j++) {
			for (int i = 0; i < tensor->size() - 1; i++) {
				tensor->move_out();
			}
			tensor->move_up();
			for (int i = tensor->size() - 1; i > 0; i--) {
				tensor->move_in();
			}
			tensor->move_up();
		}
		tensor->move_right();
	}
}
void tensor_kji_order_hilbert(tensor_walker *tensor) {
	tensor->teleport(0, 0, 0);
	for (int k = 0; k < tensor->size() / 2; k++) {
		for (int j = 0; j < tensor->size() / 2; j++) {
			for (int i = 0; i < tensor->size() - 1; i++) {
				tensor->move_out();
			}
			tensor->move_down();
			for (int i = tensor->size() - 1; i > 0; i--) {
				tensor->move_in();
			}
			tensor->move_down();
		}
		tensor->move_right();
		for (int j = 0; j < tensor->size() / 2; j++) {
			for (int i = 0; i < tensor->size() - 1; i++) {
				tensor->move_out();
			}
			tensor->move_up();
			for (int i = tensor->size() - 1; i > 0; i--) {
				tensor->move_in();
			}
			tensor->move_up();
		}
		tensor->move_right();
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

	int TENSOR_SIZE = 100; // must be even

	naive_tensor_walker *nt = new naive_tensor_walker(TENSOR_SIZE);
	z_tensor_walker *zt = new z_tensor_walker(TENSOR_SIZE);
	hilbert_tensor_walker *ht = new hilbert_tensor_walker(TENSOR_SIZE);

	fprintf(stderr, "Initializing...\n");
	nt->set_default();
	zt->set_default();
	ht->set_default();

	fprintf(stderr, "Benchmarking naive_tensor_walker...\n");
	tensor_rand_move_naive(nt);
	tensor_ijk_order_z(nt);
	tensor_kji_order_hilbert(nt);
	fprintf(stderr, "Benchmarking z_tensor_walker...\n");
	tensor_rand_move_naive(zt);
	tensor_ijk_order_z(zt);
	tensor_kji_order_hilbert(zt);
	fprintf(stderr, "Benchmarking hilbert_tensor_walker...\n");
	tensor_rand_move_naive(ht);
	tensor_ijk_order_z(ht);
	tensor_kji_order_hilbert(ht);
}