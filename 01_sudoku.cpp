#include <bits/stdc++.h>
using namespace std;

constexpr const int N = 9;
constexpr const int n = 3;

vector<vector<int>> matrix;

int unsetPositions = N * N;

struct Hash_Table
{
    bool chkRow[N] = {};
    bool chkCol[N] = {};
    bool chkBox[n][n] = {{}};
} typedef Hash_Table;

Hash_Table H[N];

inline void printMatrix();

inline void setBoard();

inline bool isSafe(int digit, int r, int c);

inline void setDigit(int digit, int r, int c);

inline void unsetDigit(int r, int c);

inline bool solveSudoku(int r, int c);

int main()
{
    // matrix = take_input_from_user();

    setBoard();

    printMatrix();

    if(solveSudoku(0, 0))
    {
        cout << "Solution Exists: \n\n";
        printMatrix();
    }
    else cout << "No Solution\n\n";
}

inline void printMatrix()
{
    for (int r = 0; r < N; ++r)
    {
        for (int c = 0; c < N; ++c)
        {
            cout << matrix[r][c] << " ";
        }
        cout << "\n";
    }
    cout << "\n";
    return;
}

inline bool isSafe(int digit, int r, int c)
{
    return (H[digit - 1].chkRow[r] == 0 && H[digit - 1].chkCol[c] == 0 && H[digit - 1].chkBox[r / n][c / n] == 0);
}

inline void setBoard()
{
    for (int r = 0; r < N; ++r)
    {
        for (int c = 0; c < N; ++c)
        {
            int digit = matrix[r][c];
            if (digit != 0)
            {
                H[digit - 1].chkRow[r] = 1;
                H[digit - 1].chkCol[c] = 1;
                H[digit - 1].chkBox[r / n][c / n] = 1;
                --unsetPositions;
            }
        }
    }
}

inline void setDigit(int digit, int r, int c)
{
    matrix[r][c] = digit;
    H[digit - 1].chkRow[r] = 1;
    H[digit - 1].chkCol[c] = 1;
    H[digit - 1].chkBox[r / n][c / n] = 1;
    --unsetPositions;

    return;
}

inline void unsetDigit(int r, int c)
{
    int digit = matrix[r][c];

    H[digit - 1].chkRow[r] = 0;
    H[digit - 1].chkCol[c] = 0;
    H[digit - 1].chkBox[r / n][c / n] = 0;
    ++unsetPositions;

    matrix[r][c] = 0;

    return;
}

inline bool solveSudoku(int r, int c)
{
    if (unsetPositions == 0) return true;

    if (c == N) { c = 0; r++; }

    if (r == N) return true;

    if (matrix[r][c] != 0) return solveSudoku(r, c + 1);

    for (int digit = 1; digit <= N; ++digit)
    {
        if (isSafe(digit, r, c))
        {
            setDigit(digit, r, c);
            if (solveSudoku(r, c + 1)) return true;
            unsetDigit(r, c);
        }
    }

    return false;
}
