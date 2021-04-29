from math import log2
from functools import partial
class MatrixWalker:
    def __init__(self, mat, method):
        self.method = method
        self.mat_to_arr_order = self._mat_to_arr_order(len(mat), method=method)
        self.arr_to_mat_order = self._arr_to_mat_order(len(mat), method=method)
        self.arr = self.matrix_to_array(mat, method=method)
        self.finger = [0,0]
        self.val = self.arr[self.mat_to_arr_order(*self.finger)]

    
    def _mat_to_arr_order(self, size, method):
        '''
        Returns function producing flattened index given 2D indices
        '''
        if method == 'z':
            pass
        elif method == 'hilbert':
            base_case = {
                bin(0): 1,
                bin(1): 2,
                bin(2): 0,
                bin(3): 3
            }
            def order(size, i,j):
                i, j = bin(i), bin(j)
                
                return 

        else:
            raise ValueError(f'method must be "z" or "hilbert"')
        return partial(order, size)

    
    def _arr_to_mat_order(self, size, method):
        '''
        Returns function producting (i,j) tuple given flattened index
        '''
        raise NotImplementedError
    
    def _pad(self, mat):
        raise NotImplementedError
    
    def _matrix_to_array(self, mat, method):
        size = len(mat)
        if log2(size)!=int(log2(size)):
            raise ValueError('Size of matrix must be power of 2')
        arr = [0] * (size**2)
        for i in range(size):
            for j in range(size):
                arr[self.mat_to_arr_order(i, j)] = mat[i][j]

        return arr
            
    def _move(self, i, j):
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