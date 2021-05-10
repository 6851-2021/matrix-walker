from matrix_walker import ZWalker, HilbertWalker, NaiveWalker
import random, time

def initialize(dim, cache_width=8, cache_height=128):
    """
    initializes z_sim and hilbert_sim with identical matrices of size 2**dim x 2**dim
    typical cache size is 64 bytes by 8 KB with each double taking 8 bytes
    """
    z_sim_matrix = []
    hilbert_sim_matrix = []
    naive_sim_matrix = []
    # generate random matrices
    for _ in range(2**dim):
        z_list = []
        hilbert_list = []
        naive_list = []
        for _ in range(2**dim):
            z_list.append(random.random())
            hilbert_list.append(random.random())
            naive_list.append(random.random())
        z_sim_matrix.append(z_list)
        hilbert_sim_matrix.append(hilbert_list)
        naive_list.append(naive_list)
    # initialize simulators
    z_sim = ZWalker(z_sim_matrix, cache_width, cache_height)
    hilbert_sim = HilbertWalker(hilbert_sim_matrix, cache_width, cache_height)
    naive_sim = NaiveWalker(hilbert_sim_matrix, cache_width, cache_height)
    z_sim.i = 2**dim - 1
    hilbert_sim.i = 2**dim - 1
    naive_sim.i = 2**dim - 1
    return z_sim, hilbert_sim, naive_sim

def random_walker(simulations):
    failed = True
    while failed:
        r = random.randrange(4)
        if r == 0:
            try:
                for matrix in simulations:
                    matrix.left()
                failed = False
            except:
                pass
        elif r == 1:
            try:
                for matrix in simulations:
                    matrix.right()
                failed = False
            except:
                pass
        elif r == 2:
            try:
                for matrix in simulations:
                    matrix.up()
                failed = False
            except:
                pass
        elif r == 3:
            try:
                for matrix in simulations:
                    matrix.down()
                failed = False
            except:
                pass

# def run_random_simulation(num_trials, moves_per_trial, size, )

if __name__ == "__main__":
    print('Initializing...')
    z_sim, hilbert_sim, naive_sim = initialize(10)
    
    print('Simulating...')
    start = 0
    n = int(1e5)
    for i in range(n):
        now = time.time()
        if now - start > 1:
            start = now
            print(f'{i}/{n}...')
        random_walker([z_sim, hilbert_sim, naive_sim])

    print("\n################ Z index ################")
    z_sim.cache.stats()
    print("\n################ Hilbert ################")
    hilbert_sim.cache.stats()
    print("\n################ Naive ################")
    naive_sim.cache.stats()

    
