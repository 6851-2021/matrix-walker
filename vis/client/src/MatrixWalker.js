function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function next_pow_2(n) {
    return Math.floor(2**(Math.ceil(Math.log2(n))))
}

// function interleave_uint32_with_zeros(input) {
//     var word = input
//     word = (word ^ (word << 16)) & 0x0000ffff0000ffff
//     word = (word ^ (word << 8 )) & 0x00ff00ff00ff00ff
//     word = (word ^ (word << 4 )) & 0x0f0f0f0f0f0f0f0f
//     word = (word ^ (word << 2 )) & 0x3333333333333333
//     word = (word ^ (word << 1 )) & 0x5555555555555555
//     return word
// }

// int interleave(int x, int y) {
//     return interleave_uint32_with_zeros(x) 
//   | (interleave_uint32_with_zeros(y) << 1);
// }

class MatrixWalker {

    constructor(mat, cache_width, cache_height) {
        this.mat = mat
        this.size = mat.length
        this.n_pw2 = next_pow_2(mat.length)
        this.arr = this.matrix_to_array(mat)
        this.i = 0
        this.j = 0
        this.loc = 0
        this.val = this.arr[this.translate(this.i, this.j)]
        // this.cache = Cache(cache_width, cache_height) // oops
    }

    matrix_to_array(mat) {
        var arr = Array(this.n_pw2**2).fill(-1)
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                arr[this.translate(i,j)] = mat[i][j]
            }
        }
        return arr
    }

    move(i, j) {
        if (i < 0 || i >= this.size || j < 0 || j >= this.size){
            throw "attempted to move out of bounds"
        }
        this.i = i
        this.j = j
        this.loc = this.translate(i, j)
        this.val = this.arr[this.loc]
        // this.cache.access(self.get_cache_index(i, j))
    }

    random_teleport(){
        this.move(getRandomInt(this.size), getRandomInt(this.size))
    }

    teleport(i, j){
        this.move(i,j)
    }

    left() {
        this.move(this.i, this.j - 1)
    }

    right() {
        this.move(this.i, this.j + 1)
    }

    up() {
        this.move(this.i - 1, this.j)
    }

    down() {
        this.move(this.i + 1, this.j)
    }

    get() {
        return this.val
    }

    // get_cache_index(i, j) {
    //     Math.floor(this.translate(i, j) / this.cache.width)
    // }

}

class ZWalker extends MatrixWalker {

    constructor(mat, cache_width, cache_height) {
        super(mat, cache_width, cache_height)
    }

    translate(i, j) {
        // bin_i = bin(i+self.n_pw2)[3:] # ensure correct length of bin repr
        // bin_j = bin(j+self.n_pw2)[3:]
        // interleaved = ''.join(chain(*zip(bin_i, bin_j)))
        // return int(interleaved, 2)
    }
}

class HilbertWalker extends MatrixWalker {

    constructor(mat, cache_width, cache_height) {
        super(mat, cache_width, cache_height)
    }

    translate(i, j) {
        var base_case = [0, 1, 3, 2]
        var ret = 0
        for (var mask = this.n_pw2 / 2; mask >= 1; mask /= 2) {
            var quadrant = (((i & mask) === mask) << 1) + ((j & mask) === mask)
            ret += base_case[quadrant]
            i &= mask - 1
            j &= mask - 1
            if (quadrant == 0) {
                [i, j] = [j, i]
            } 
            else if (quadrant == 2) {
                [i, j] = [mask - 1 - j, mask - 1 - i]
            }
            if (mask > 1) {
                ret <<= 2
            }
        }
        return ret
    }

    reverse_translate(n) {
        // n: a positive int less than size of this.arr
        var n_str = (this.n_pw2**2 + n).toString(2).slice(1)
        // un-interleave n
        var i_arr = ''
        var j_arr = ''
        for (var idx = 0; idx < n_str.length; idx += 2) {
            i_arr += n_str.charAt(idx)
            j_arr += n_str.charAt(idx + 1)
        }
        i_arr = parseInt(i_arr)
        j_arr = parseInt(j_arr)

        // start from innermost recursion (least significant bit)
        var i_mat = 0
        var j_mat = 0
        for (var mask = 1; mask < this.n_pw2; mask *= 2) {
            var i_cur = ((i_arr & mask) === mask)
            var j_cur = i_cur ^ ((j_arr & mask) === mask)
            var quadrant = (i_cur << 1) + (j_cur)
            if (mask > 1) {
                if (quadrant == 0) {
                    [i_mat, j_mat] = [j_mat, i_mat]
                } 
                else if (quadrant == 2) {
                    [i_mat, j_mat] = [mask - 1 - j_mat, mask - 1 - i_mat]
                }
            }
            i_mat += i_cur * mask
            j_mat += j_cur * mask
        }
        return [i_mat, j_mat]
    }
}

class NaiveWalker extends MatrixWalker {

    constructor(mat, cache_width, cache_height) {
        super(mat, cache_width, cache_height)
    }

    translate(i, j) {
        return this.size * i + j
    }

    reverse_translate(n) {
        var i = Math.floor(n / this.size)
        return [i, n - this.size * i]
    }
}

// run these using ```node MatrixWalker.js```
var small = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]
var hw = new HilbertWalker(small, 6, 8)
console.log("#####")
console.log(hw.arr)