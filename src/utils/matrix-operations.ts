import { CreateBlockMatrix, CreateIdentity, GetMatrixColumns, GetMatrixRows, SwapRows, type Matrix } from "./matrix";

type GaussElimData = {
    result_matrix: Matrix,
    failed: boolean,
    elimination_steps?: Matrix[],

}

type GaussJordanData = {
    ref_form: Matrix,
    normalized_form?: Matrix,
    result?: Matrix,
    failed: boolean,
}

type InverseData = {
    block_matrix: Matrix,
    gauss_jordan_form: Matrix,
    result?: Matrix,
    failed: boolean
}

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


/**
 * Takes in a matrix and performs Gaussian elimination, resulting in the matrix in Reduced Echelon Form (REF)
 * 
 * @param matrix The matrix which Gaussian elimination will be performed on
 * 
 * @returns A clone of the provided matrix in REF
 */
export function GaussianElimination(matrix: Matrix): GaussElimData {
    let result = matrix.map(row => [...row]); // This is done so React will trigger a re-render because this is technically a new variable.
    let elimination_steps: Matrix[] = [];
    const columns = GetMatrixColumns(result);
    const rows = GetMatrixRows(result);
    
    let noZeroPivots = true;
    for (let pivot = 0; pivot < columns && pivot < rows; pivot++) { // n = current pivot number
        if (result[pivot][pivot] == 0) { // If a zero pivot is encountered
            noZeroPivots = false;
            for (let i = pivot + 1; i < rows; i++) { // Search the rows below the current pivot to find a suitable swap
                if (result[i][pivot] != 0) {
                    result = SwapRows(result, pivot, i) as Matrix; // Swaps the row containing the nth pivot with the ith row
                    noZeroPivots = true;
                    break;
                }
            }
        }
        // If the zero pivot cannot be resolved, elimination fails
        if (noZeroPivots != true) {
            return {
                result_matrix: result,
                failed: true
            };
        }
        // Multiplier = entry to eliminate in row i / pivot in row n
        // Creates an identity matrix with size = # of rows in our matrix (will be used as an elimination matrix)
        let elimination_matrix = CreateIdentity(rows);
        for (let i = pivot + 1; i < rows; i++) { // Gather all multipliers below the pivot to place in elimination matrix
            //In the pivot-th elimination matrix, place the multiplier in the [i, pivot] spot
            elimination_matrix[i][pivot] = -(result[i][pivot] / result[pivot][pivot]);
        }
        console.log(elimination_matrix);
        result = MultiplyMatrices(elimination_matrix, result); // Multiply our current matrix by the elimination matrix
        elimination_steps.push(result.map(row => [...row]));
        console.log(elimination_steps);
    }

    return {result_matrix: result, failed: false, elimination_steps: elimination_steps};
}

export function GaussJordanElimination(matrix: Matrix): GaussJordanData {
    // Step 1, perform Gaussian Elimination
    let ref_form = GaussianElimination(matrix);
    if (ref_form.failed) { // If Gaussian elimination failed, return the matrix up to the point of failure
        return {
            ref_form: ref_form.result_matrix,
            failed: ref_form.failed
        };
    }
    let normalized_form = ref_form.result_matrix.map(row => [...row]);
    const normalRows = GetMatrixRows(normalized_form);
    const normalCols = GetMatrixColumns(normalized_form);
    const numberOfPivots = Math.min(normalRows, normalCols);
    // TODO: Step 2: Normalize the matrix (divide each row by its pivot)
    for (let i = 0; i < numberOfPivots; i++) { // For each pivot [i][i],
        let pivot = normalized_form[i][i];
        for (let j = i; j < normalCols; j++) { // For each element to the right of the pivot [i][j] (including the pivot),
            normalized_form[i][j] = normalized_form[i][j] / pivot; // Divide each cell by the pivot to normalize (1's on the diagonal)
        }
    }
    // Step 3: Backwards elimination
    let result = normalized_form.map(row => [...row]);
    let multiplier = 0;
    // This will be the number of pivots
    // For every row with a pivot, starting at the last pivot working backwards
    for (let i = numberOfPivots-1; i > 0 ; i--) {
        // For every row above the current pivot, iterating upwards
        for (let j = i-1; j >= 0; j--) {
            // Since the pivot is 1 because normalization, the multiplier is just the element above the current pivot in the current row
            multiplier = result[j][i];
            // Starting at the cell above the current pivot on the current row. Any cells to the left will be added with 0
            // (because upper triangular), so they can be skipped
            for (let k = i; k < normalCols; k++) {
                result[j][k] -= (multiplier * result[i][k]);
            }
        }
    }
    return {
        ref_form: ref_form.result_matrix,
        normalized_form: normalized_form,
        result: result,
        failed: ref_form.failed,
    }
}

export function InvertMatrix(matrix: Matrix): InverseData {
    // Step 1: Create a block matrix with the input matrix and an Identity Matrix [M I]
    let block = CreateBlockMatrix(matrix, CreateIdentity(GetMatrixRows(matrix)));

    // Step 2: Perform Gauss-Jordan Elimination on the block matrix
    let elimination = GaussJordanElimination(block);

    // Now, the eliminated matrix should be a block matrix with the identity on the left and the inverted matrix on the right
    // Step 3: Extract inverted matrix
    if (!elimination.result) { // Elimination failed
        return {
            block_matrix: block,
            gauss_jordan_form: elimination.ref_form,
            failed: true
        };
    }
    let GJ_Form = elimination.result;
    const size = GetMatrixRows(GJ_Form); // Because we're dealing with square matrices, the number of columns in the inverted matrix is equal to the number of rows in the block matrix
    let inverted: Matrix = Array(size).fill(null).map(()=> Array(size).fill(0));
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            inverted[i][j] = GJ_Form[i][j + size];
        }
    }
    return {
        block_matrix: block,
        gauss_jordan_form: GJ_Form,
        result: inverted,
        failed: false
    };
}

export function GramSchmidt(matrix: Matrix) {
    return 1;
}