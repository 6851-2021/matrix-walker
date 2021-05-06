
class tensor_walker {
    public:
};

class naive_tensor_walker : public tensor_walker {
    private:
        int n;
        int i, j, k;
        int *arr;
        int value;
        int translate(int i, int j, int k);
    public:
        naive_tensor_walker(int n);
        void teleport(int i, int j, int k);
        void move_left();
        void move_right();
        void move_up();
        void move_down();
        void move_in();
        void move_out();
        int get();
        void set(int i, int j, int k, int value);
};

class z_tensor_walker : public tensor_walker {
    private:
        int n;
        int n_pw2;
        int i, j, k;
        int i_bits, j_bits, k_bits;
        int *arr;
        int z_value;
        int value;
        int translate(int i, int j, int k);
    public:
        z_tensor_walker(int n);
        void teleport(int i, int j, int k);
        void move_left();
        void move_right();
        void move_up();
        void move_down();
        void move_in();
        void move_out();
        int get();
        void set(int i, int j, int k, int value);
};

class hilbert_tensor_walker : public tensor_walker {
    private:
        int n;
        int n_pw2;
        int i, j, k;
        int *arr;
        int h_value;
        int value;
        int translate(int i, int j, int k);
        void move(int i, int j, int k);
    public:
        hilbert_tensor_walker(int n);
        void teleport(int i, int j, int k);
        void move_left();
        void move_right();
        void move_up();
        void move_down();
        void move_in();
        void move_out();
        int get();
        void set(int i, int j, int k, int value);
};