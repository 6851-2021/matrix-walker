from math import log2, ceil
from functools import partial
class MatrixWalker:
    def __init__(self, mat, method):
        self.method = method
        self.mat = mat
        self.size = self._next_pow_2(len(mat))
        self.mat_to_arr_order = self._mat_to_arr_order(method=method)
        # self.arr_to_mat_order = self._arr_to_mat_order(self.size, method=method)
        self.arr = self._matrix_to_array(mat)
        self.finger = [0,0] 
        self.val = self.arr[self.mat_to_arr_order(*self.finger)]

    
    def _mat_to_arr_order(self, method):
        '''
        Returns function producing flattened index given 2D indices
        '''
        if method == 'z':
            pass
        elif method == 'hilbert':
            base_case = [0, 1, 3, 2]
            def order(size, i,j):
                ret = 0
                for k in range(int(log2(size))-1, -1, -1):
                    mask = 2**k
                    quadrant = ((i & mask == mask) << 1) + (j & mask == mask)
                    i &= mask - 1
                    j &= mask - 1
                    ret += base_case[quadrant]
                    if quadrant == 0:
                        i, j = j, i
                    elif quadrant == 2:
                        i, j = mask - 1 - j, mask - 1 - i
                    if k > 0:
                        ret <<= 2
                    
                return ret
        else:
            raise ValueError(f'method must be "z" or "hilbert"')
        return partial(order, self.size)

    
    def _arr_to_mat_order(self, size, method):
        '''
        Returns function producting (i,j) tuple given flattened index
        '''
        raise NotImplementedError
    
    def _next_pow_2(self, n):
        return int(2**(ceil(log2(n))))
    
    def _matrix_to_array(self, mat):
        arr = [-1] * (self.size**2)
        for i in range(len(mat)):
            for j in range(len(mat)):
                arr[self.mat_to_arr_order(i, j)] = mat[i][j]

        return arr
            
    def _move(self, i, j):
        if i< 0 or i>=len(self.mat) or j<0 or j>=len(self.mat):
            raise IndexError('attempted to move out of bounds')
        self.finger = [i,j]
        self.val = self.arr[self.mat_to_arr_order(i, j)]

    def teleport(self, i, j):
        self._move(i,j)

    def _move_one(self, di, dj):
        i,j = self.finger
        self._move(i+di, j+dj)
        
    def left(self):
        self._move_one(0, -1)
    
    def right(self):
        self._move_one(0, 1)

    def up(self):
        self._move_one(-1, 0)
    
    def down(self):
        self._move_one(1, 0)
    
    def get(self):
        return self.val

if __name__=="__main__":
    testarr = [[0]* 100] * 100
    for i in range(100):
        for j in range(100):
            testarr[i][j] = i + j
    mw = MatrixWalker(testarr, method='hilbert')
    mw4 = MatrixWalker([[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]], method='hilbert')