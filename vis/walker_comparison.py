from matrix_walker import ZWalker, HilbertWalker
import random, time

def initialize(dim, cache_width=8, cache_height=128):
    """
    initializes z_sim and hilbert_sim with identical matrices of size 2**dim x 2**dim
    typical cache size is 64 bytes by 8 KB with each doiuble taking 8 bytes
    """
    z_sim_matrix = []
    hilbert_sim_matrix = []
    for _ in range(2**dim):
        z_list = []
        hilbert_list = []
        for _ in range(2**dim):
            z_list.append(random.random())
            hilbert_list.append(random.random())
        z_sim_matrix.append(z_list)
        hilbert_sim_matrix.append(hilbert_list)
    z_sim = ZWalker(z_sim_matrix, cache_width, cache_height)
    hilbert_sim = HilbertWalker(hilbert_sim_matrix, cache_width, cache_height)
    return z_sim, hilbert_sim

def random_move(z_sim, hilbert_sim):
    r = random.randrange(0,4)
    if r == 0:
        try:
            z_sim.left()
            hilbert_sim.left()
        except:
            pass
    elif r == 1:
        try:
            z_sim.right()
            hilbert_sim.right()
        except:
            pass
    elif r == 2:
        try:
            z_sim.up()
            hilbert_sim.up()
        except:
            pass
    elif r == 3:
        try:
            z_sim.down()
            hilbert_sim.down()
        except:
            pass

if __name__ == "__main__":
    print('Initializing...')
    z_sim, hilbert_sim = initialize(10, 8, 16)
    
    print('Simulating...')
    start = 0
    n = int(1e5)
    for i in range(n):
        now = time.time()
        if now - start > 1:
            start = now
            print(f'{i}/{n}...')
        random_move(z_sim, hilbert_sim)

    print("\n################ Z index ################")
    z_sim.cache.stats()
    print("\n################ Hilbert ################")
    hilbert_sim.cache.stats()

    
