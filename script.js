// script.js

let N;
let n;

function createGrid() {
    N = parseInt(document.getElementById('grid-size').value);
    n = Math.sqrt(N);
    if (isNaN(N) || N <= 0 || !Number.isInteger(n)) {
        alert("Please enter a valid perfect square grid size (e.g., 9 for 9x9, 4 for 4x4).");
        return;
    }
    const container = document.getElementById('grid-container');
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${N}, 40px)`;
    container.style.gridTemplateRows = `repeat(${N}, 40px)`;

    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = N;
            input.classList.add('user-input');
            input.id = `cell-${r}-${c}`;
            container.appendChild(input);
        }
    }
}

function getMatrix() {
    const matrix = [];
    for (let r = 0; r < N; r++) {
        const row = [];
        for (let c = 0; c < N; c++) {
            const value = parseInt(document.getElementById(`cell-${r}-${c}`).value);
            row.push(isNaN(value) ? 0 : value);
        }
        matrix.push(row);
    }
    return matrix;
}

function setMatrix(matrix) {
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            const input = document.getElementById(`cell-${r}-${c}`);
            if (input.value == '') {
                input.value = matrix[r][c];
                input.classList.remove('user-input');
                input.classList.add('solved-input');
            }
        }
    }
}

function isSafe(matrix, r, c, digit) {
    for (let x = 0; x < N; x++) {
        if (matrix[r][x] == digit || matrix[x][c] == digit || matrix[Math.floor(r / n) * n + Math.floor(x / n)][Math.floor(c / n) * n + (x % n)] == digit) {
            return false;
        }
    }
    return true;
}

function solveSudokuAlgorithm(matrix, r, c) {
    if (r == N - 1 && c == N) return true;
    if (c == N) { r++; c = 0; }
    if (matrix[r][c] != 0) return solveSudokuAlgorithm(matrix, r, c + 1);

    for (let digit = 1; digit <= N; digit++) {
        if (isSafe(matrix, r, c, digit)) {
            matrix[r][c] = digit;
            if (solveSudokuAlgorithm(matrix, r, c + 1)) return true;
            matrix[r][c] = 0;
        }
    }
    return false;
}

function solveSudoku() {
    const matrix = getMatrix();
    if (solveSudokuAlgorithm(matrix, 0, 0)) {
        setMatrix(matrix);
    } else {
        alert("No Solution exists");
    }
}

function clearGrid() {
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            const input = document.getElementById(`cell-${r}-${c}`);
            input.value = '';
            input.classList.remove('solved-input');
            input.classList.add('user-input');
        }
    }
}
