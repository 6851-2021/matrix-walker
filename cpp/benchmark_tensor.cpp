#include "tensor_walker.h"
#include <iostream>
#include <cstring>

void tensor_rand_move(tensor_walker *tensor) {
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

void tensor_ijk_order(tensor_walker *tensor) {
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

void tensor_kji_order(tensor_walker *tensor) {
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

int main(int argc, char* argv[]) {
	#ifdef DEBUG
		// run with ```make benchmark DEBUG=1```
		std::cout << "In debug mode!" << std::endl;
	#else
		// run with ```make benchmark``` or ```make benchmark DEBUG = 0```
		std::cout << "In production mode!" << std::endl;
	#endif

	char* tw_type = argv[1];
	char* test = argv[2];

	int TENSOR_SIZE = 100; // must be even

	tensor_walker* tw;
	if (strcmp(tw_type, "naive") == 0){
		tw = new naive_tensor_walker(TENSOR_SIZE);
	}
	else if (strcmp(tw_type, "z") == 0){
		tw = new z_tensor_walker(TENSOR_SIZE);
	}
	else if (strcmp(tw_type, "hilbert")){
		tw = new hilbert_tensor_walker(TENSOR_SIZE);
	}
	else {
		fprintf(stderr, "invalid tensor_walker type specified: %s. must be one of 'naive', 'z', 'hilbert'", tw_type);
		return -1;
	}

	fprintf(stderr, "Initializing...\n");
	tw->set_default();

	fprintf(stderr, "Benchmarking...\n");
	if (strcmp(test, "rand_move") == 0){
		tensor_rand_move(tw);
	}
	else if (strcmp(test, "ijk_order") == 0){
		tensor_ijk_order(tw);
	}
	else if (strcmp(test, "kji_order") == 0){
		tensor_kji_order(tw);
	}
	else {
		fprintf(stderr, "invalid test specified. must be one of 'rand_move', 'ijk_order', 'kji_order'.");
	}
}