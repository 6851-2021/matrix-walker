CC := g++
TARGET := benchmark
BINARIES := benchmark matrix_walker test_matrix_walker

DEBUG := 0
FLTO := 0

ifeq ($(DEBUG),1)
	CFLAGS += -O0 -DDEBUG
else
	CFLAGS += -O3 -DNDEBUG
endif

ifeq ($(FLTO),1)
	CFLAGS += -flto
endif

benchmark: benchmark.cpp
	$(CC) $(CFLAGS) $^ -o $@ 

test_matrix_walker: test_matrix_walker.cpp matrix_walker.cpp
	$(CC) $(CFLAGS) $^ -o $@ 

clean:
	rm -f *.o *.d* *~ $(BINARIES)
