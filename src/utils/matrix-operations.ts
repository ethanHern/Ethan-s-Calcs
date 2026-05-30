import { GetMatrixColumns, GetMatrixRows, type Matrix } from "./matrix";

/**
 * Takes in two matrices and performs standard matrix multiplication.
 * The number of columns in A must match the number of rows in B.
 * Returns the resulting matrix
 * @param A The matrix on the left of the multiplication
 * @param B The matrix on the right of the multiplication
 * @returns The resulting matrix with the same number of columns as B has, and the same number of rows as A has.
 */
export function MultiplyMatrices(A: Matrix, B: Matrix): Matrix {
    let c: Matrix = Array(GetMatrixRows(A)).fill(null).map(() => Array(GetMatrixColumns(B)).fill(0));
    for (let i = 0; i < GetMatrixRows(A); i++) {
        for (let j = 0; j < GetMatrixColumns(B); j++) {
            let temp = 0;
            for (let k = 0; k < GetMatrixColumns(A); k++) {
                temp+= A[i][k] * B[k][j];
            }
            c[i][j] = temp;
        }
    }
    return c;
}

export function AddMatrices(A: Matrix, B: Matrix): Matrix {
    const rows = GetMatrixRows(A);
    const cols = GetMatrixColumns(A);
    let c: Matrix = Array(rows).fill(null).map(()=> Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            c[i][j] = A[i][j] + B[i][j];
        }
    }
    return c;
}

export function SubtractMatrices(A: Matrix, B: Matrix): Matrix {
    const rows = GetMatrixRows(A);
    const cols = GetMatrixColumns(A);
    let c: Matrix = Array(rows).fill(null).map(()=> Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            c[i][j] = A[i][j] - B[i][j];
        }
    }
    return c;
}