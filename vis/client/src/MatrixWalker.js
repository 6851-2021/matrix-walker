function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function next_pow_2(n) {
    return Math.floor(2**(Math.ceil(Math.log2(n))))
}

function interleave_uint16_with_zeros(input) {
    var word = input
    word = (word ^ (word << 16)) & 0x0000ffff
    word = (word ^ (word << 8 )) & 0x00ff00ff
    word = (word ^ (word << 4 )) & 0x0f0f0f0f
    word = (word ^ (word << 2 )) & 0x33333333
    word = (word ^ (word << 1 )) & 0x55555555
    return word
}

function interleave(x, y) {
    return interleave_uint16_with_zeros(x) 
  | (interleave_uint16_with_zeros(y) << 1);
}

class MatrixWalker {

    constructor(matrix_size, cache_width, cache_height) {
        this.size = matrix_size
        this.n_pw2 = next_pow_2(matrix_size)
        this.i = 0
        this.j = 0
        this.loc = 0
        this.cache = new Cache(cache_width, cache_height)
        this.move(0,0)
    }

    move(i, j) {
        if (i < 0 || i >= this.size || j < 0 || j >= this.size){
            console.log("attempted to move out of bounds")
        } else {
            this.i = i
            this.j = j
            this.loc = this.translate(i, j)
            this.cache.access(this.get_cache_index(i, j))
        }
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

    get_cache_index(i, j) {
        return Math.floor(this.translate(i, j) / this.cache.width)
    }

    get_indices_in_cache() {
        var indices = []
        console.log("length of lru is " + this.cache.lru.length)
        for (var i = 0; i < this.cache.lru.length; i++) {
            for (var j = 0; j < this.cache.width; j++) {
                var coords = this.reverse_translate(this.cache.lru[i] * this.cache.width + j)
                indices.push(coords[0] * this.size + coords[1])
            }
        }
        console.log(indices)
        return indices
    }

    get_cache_visual() {
        var arr = Array(this.size * this.size).fill(1)
        var indices = this.get_indices_in_cache();
        for (var i = 0; i < indices.length; i++) {
            arr[indices[i]] = 0
        }
        return arr
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

class ZWalker extends MatrixWalker {

    constructor(mat, cache_width, cache_height) {
        super(mat, cache_width, cache_height)
    }

    translate(i, j) {
        return interleave(j, i);
    }

    reverse_translate(n) {
        var n_str = (n).toString(2)
        if (n_str.length % 2 != 0) n_str = "0" + n_str
        var pow = 1
        var i = 0
        var j = 0
        for (var k = 0; k < n_str.length/2; k++) {
            i += pow * parseInt(n_str.slice(n_str.length - 1 - 2*k - 1, n_str.length - 1 - 2*k)) 
            j += pow * parseInt(n_str.slice(n_str.length - 1 - 2*k, n_str.length - 2*k))
            pow *= 2
        }
        return [i,j]
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


class Cache {

    constructor(width, height){
        this.width = width
        this.height = height
        this.lru = []
        this.cache_accesses = 0
        this.cache_hits = 0
        this.cache_misses = 0
    }

    access(line) {
        if (this.lru.includes(line)) {
            this.cache_accesses++
            this.cache_hits++
            this.lru.splice(this.lru.indexOf(line), 1);
            this.lru.unshift(line)
        }
        else if (this.lru.length >= this.height) {
            this.cache_accesses++
            this.cache_misses++
            this.lru.pop()
            this.lru.unshift(line)
        }
        else {
            this.cache_accesses++
            this.cache_misses++
            this.lru.unshift(line)
        }
    }

    stats() {
        console.log(`Cache of width ${this.width} and height ${this.height}`)
        console.log(`Total of ${this.cache_accesses} cache accesses and ${this.cache_hits} cache hits`)
        if (this.cache_accesses == 0) {
            console.log("No cache accesses")
        }
        else {
            console.log(`Cache hit percentage: ${this.cache_hits/this.cache_accesses}`)
        }
    }
}

export {NaiveWalker, ZWalker, HilbertWalker};

// run these using ```node MatrixWalker.js```
// var small = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]
// var hw = new HilbertWalker(small, 6, 8)
// var zw = new ZWalker(small, 6, 8)
// console.log("#####")
// console.log(zw.translate(0,0))
// console.log(zw.translate(0,1))
// console.log(zw.arr)
// for (var i = 0; i < 16; i++) {
//     translate = zw.reverse_translate(i)
//     inverse = zw.translate(translate[0], translate[1])
//     console.log(`translate of ${i} is ${translate}, and its reverse is ${inverse}`)
// }

// var n_str = (15).toString(2)
// un-interleave n
// console.log(n_str)

// for testing cache
// test_cache = new Cache(8, 4)
// test_cache.access(0)
// test_cache.access(1)
// test_cache.access(2)
// test_cache.access(3)
// test_cache.access(2)
// console.log(test_cache.lru)
// test_cache.stats()
// // console.log(test_cache.stats) // expect deque([4, 3, 2, 1])
// for (var i = 0; i < 1000; i++) {
//     r = getRandomInt(5)
//     test_cache.access(r)
// }
// test_cache.stats() // should be around 0.8

// var hw = new HilbertWalker(16, 6, 8)
// var zw = new ZWalker(8, 6, 8)
// var nw = new NaiveWalker(8, 6, 8)

// for (var i = 0; i < 2; i++) {
//     for (var j = 0; j < 16; j++) {
//         console.log(`the index of i ${i} and j ${j} translates to ${hw.translate(i,j)}`)
//         console.log(`but the inverse of ${hw.translate(i,j)} is ${hw.reverse_translate(hw.translate(i,j))}`)
//     }
// }
// console.log(hw.get_cache_visual())
// console.log(zw.get_cache_visual())
// console.log(nw.get_cache_visual())