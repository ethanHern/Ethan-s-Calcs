import type { Vector } from "./vector";

/*A custom type that represents a 2D array*/
export type Matrix = number[][];
export type StringMatrix = string[][];

export class MatrixMethods {
    constructor() {}

    public from_array(input: any[][]): Matrix | string {
        let matrix: Matrix;
        if (isMatrix(input)) {
            matrix = input as Matrix;
            if (VerifyMatrixForm(matrix)) {
                return matrix;
            }
            else {
                return "Inconsistent row lengths"
            }
        }
        else {
            return "Inconsistent/Invalid data types across cells."
        }
        
    }

    public rows(matrix: Matrix) {
        return (matrix.length);
    }

    public cols(matrix: Matrix) {
        return (matrix[0].length);
    }
    
    public copy(matrix: Matrix): Matrix  {
        return matrix.slice(0);
    }
    
    public transpose(matrix: Matrix): Matrix {
        const rows = GetMatrixRows(matrix);
        const cols = GetMatrixColumns(matrix);
        let result = Array(cols).fill(null).map(()=>Array(rows).fill(0));
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                result[j][i] = matrix[i][j];
            }
        }
    return result;
    }

    public is_square(matrix: Matrix): boolean {
        return (GetMatrixColumns(matrix) == GetMatrixRows(matrix));
    }

    public is_empty(matrix: Matrix): boolean {
        for (let i = 0; i < GetMatrixRows(matrix); i++) {
            for (let j = 0; j < GetMatrixColumns(matrix); j++) {
                if (matrix[i][j] != 0) { return false; }
            }
        }
        return true;
    }

    public matrix_to_vectors(matrix: Matrix): Vector[] {
        let vectors: Vector[] = [];
        for (let col = 0; col < GetMatrixColumns(matrix); col++) {
            let vec: Vector = [];
            for (let row = 0; row < GetMatrixRows(matrix); row++) {
                vec.push(matrix[row][col])
            }
            vectors.push(vec);
        }
        return vectors;
    }

    public filter_tiny_numbers(matrix: Matrix): Matrix {
        const tolerance = 1e-14;
        let result = this.copy(matrix);
        for (let i = 0; i < this.rows(matrix); i++) {
            for (let j = 0; j < this.cols(matrix); j++) {
                if (result[i][j] < tolerance) {result[i][j] = 0}
            }
        }
        return result;
    }
    
}



function isMatrix(input: any, type: "number" | "string" = "number"): input is Matrix {
    return (Array.isArray(input) && 
            input.every(row => Array.isArray(row)
                && row.every(cell => typeof cell === type)))
}


export function VerifyMatrixForm(matrix: Matrix): boolean {
    // Returns false if matrix is empty
    if (matrix.length = 0) {return false;}

    const row_length = matrix[0].length;
    for (let row = 0; row < matrix.length; row++) {
        if (matrix[row].length != row_length ) {
            return false;
        }
    }
    return true;
}

/**
Takes a Matrix-type variable and returns the number of rows it contains
@param matrix The matrix whose rows will be counted
@returns The number of rows the matrix contains
 **/
export function GetMatrixRows(matrix: Matrix | StringMatrix): number {
    return (matrix.length);
}

/**
 * Takes a Matrix-type variable and returns the number of columns it contains
 * @param matrix The matrix whose columns will be counted
 * @returns The number of columns the matrix contains
 **/
export function GetMatrixColumns(matrix: Matrix | StringMatrix): number {
    return (matrix[0].length);
}

/**
 * Returns a matrix where row with index rowA is swapped with the row with index rowB
 * @param matrix The matrix whose rows will be swapped
 * @param rowA One of the rows that will be swapped
 * @param rowB The other row that will be swapped
 * 
 * @returns A clone of the provided matrix, now with swapped rows
**/
export function SwapRows(matrix: Matrix | StringMatrix, rowA: number, rowB: number): Matrix | StringMatrix {
    let temp = matrix.slice(0); // This is done so that a React triggers a re-render, since technically it is a new value and not a modification of the original value
    temp[rowA] = matrix[rowB];
    temp[rowB] = matrix[rowA];
    return temp;
}

/**
 * Creates and returns an identity matrix with specified dimensions (a square matrix)
 * @param length The size of the resulting identity matrix (will be used to determine the number of rows and columns)
 * 
 * @returns A square matrix of the specified size with ones on the diagonal
**/
export function CreateIdentity(length: number): Matrix {
    let I = Array(length).fill(null).map(()=> Array(length).fill(0)); // Creates a matrix of zeroes
    for (let index = 0; index < length; index++) {
        I[index][index] = 1; // Places a 1 at every position [i][i]
    }

    return I;
}

/**
 * Takes in two matrices and returns a block matrix created by placing the two matrices side-by-side
 * @param A The matrix that will be placed on the left of the block matrix
 * @param B The matrix that will be placed on the right of the block matrix
 * @returns A block matrix [A B]
 */
export function CreateBlockMatrix(A: Matrix, B: Matrix): Matrix {
    let temp: Matrix = [];
    for (let i = 0; i < GetMatrixRows(A); i++) {
        temp[i] = [...A[i], ...B[i]];
    }
    return temp;
}

/**
 * Adds an array to the 2D array provided,
 * effectively adding a row to a matrix.
 * Returns the resulting matrix
 * @param matrix The matrix to which a row will be added
 * 
 * @returns A clone of the provided matrix with an added row
 **/
export function AddRow(matrix: Matrix) : Matrix {
    return [...matrix, new Array(GetMatrixColumns(matrix)).fill(0)];
}

/**
 * Removes the last array inside the 2D array provided,
 * effectively removing the last row from a matrix.
 * Returns the resulting matrix
 * 
 * @param matrix The matrix from which a row will be removed
 * 
 * @returns A clone of the provided matrix with a row removed
 **/
export function RemoveRow(matrix: Matrix): Matrix {
    if (GetMatrixRows(matrix) == 1) {return matrix;}
    return matrix.slice(0, -1);
}

/**
 * Appends a zero to every array inside the 2D array provided,
 * effectively adding a column to a matrix.
 * Returns the resulting matrix
 * 
 * @param matrix The matrix to which a column will be added
 * 
 * @returns A clone of the provided matrix with an added column 
 **/
export function AddColumn(matrix: Matrix, column?: number[]): Matrix {
    let temp: Matrix = [];
    for (let i = 0; i < GetMatrixRows(matrix); i++) {
        let new_cell: number = column ? column[i] : 0;
        temp[i] = [...matrix[i], new_cell]; // Adds an element to the end of every row
    }
    return temp;
}

/**
 * Removes the last element from every array inside the 2D array provided,
 * effectively removing the last column from a matrix.
 * Returns the resulting matrix
 * 
 * @param matrix The matrix from which a column will be removed
 * 
 * @returns A clone of the provided matrix with a column removed
 **/
export function RemoveColumn(matrix: Matrix): Matrix {
    if (GetMatrixColumns(matrix) == 1) {return matrix;}
    let temp: Matrix = []
    for (let i = 0; i < GetMatrixRows(matrix); i++) {
        temp[i] = matrix[i].slice(0, -1);
    }
    return temp;
}

export function StringToNum(matrix: StringMatrix): Matrix {
    const rows = GetMatrixRows(matrix);
    const cols = GetMatrixColumns(matrix);
    let outputMatrix: Matrix = Array(rows).fill(null).map(()=> Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let convertedValue = Number(matrix[i][j].replace('/\r/g', ''));
            outputMatrix[i][j] = convertedValue;
        }
    }
    return outputMatrix;
}