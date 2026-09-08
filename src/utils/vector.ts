import { AddColumn, MatrixMethods, type Matrix } from "./matrix";

export type Vector = number[];


export class VectorMethods {

    constructor() {}

    public copy(vector: Vector): Vector {
        return vector.slice(0);
    }

    public to_matrix(vector: Vector): Matrix {
        let matrix: Matrix = [];
        for (let i = 0; i < vector.length; i++) {
            matrix.push([vector[i]])
        }
        return matrix;
    }


    public vectors_to_matrix(vectors: Vector[]): Matrix {
        // Verify all vectors are the same length
        const vector_length = vectors[0].length;
        for (let i = 0; i < vectors.length; i++) {
            if (vectors[i].length != vector_length) { return [];}
        }

        let matrix: Matrix = this.to_matrix(vectors[0]);
        if (vectors.length == 1) {return matrix;}
        else {
            for (let col = 1; col < vectors.length; col++) {
                matrix = AddColumn(matrix, vectors[col]);
            }
            return matrix;
        }
    }

    public subtract(vec1: Vector, vec2: Vector): Vector {
        let result = this.copy(vec1);
        for (let i = 0; i < result.length; i++) {
            result[i] -= vec2[i];
        }
        return result;
    }

    public magnitude(vector: Vector): number {
        let mag = 0;
        for (let i = 0; i < vector.length; i++) {
            mag += Math.abs(vector[i]) ** 2;
        }
        return Math.sqrt(mag);
    }

    public transpose(vector: Vector): Matrix {
        const mMethods = new MatrixMethods();
        return mMethods.transpose(this.to_matrix(vector));
    }

    public normalize(vector: Vector): Vector {
        const mag = this.magnitude(vector);
        let result = this.copy(vector);
        for (let i = 0; i < vector.length; i++) {
            result[i] = result[i] / mag;
        }
        return result;
    }
}