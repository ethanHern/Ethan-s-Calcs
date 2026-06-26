import { useState } from "react";
import { type Matrix } from "../utils/matrix";
import InputBox from "../components/InputBox";
import { InvertMatrix, type MatrixOutputData } from "../utils/matrix-operations";
import { Helmet } from "react-helmet-async";
import MatrixOutputArea from "../components/MatrixOutputArea";

export default function Inverse() {
  const [A, setA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [output, setOutput] = useState<MatrixOutputData>();

    return (
        <div className="mt-2 flex-col">
          <Helmet>
            <title>Inverse - Matrix Calculator | Ethan's Calcs</title>
          </Helmet>
          <h1 className="font-extrabold text-4xl text-center">Inverse Matrix</h1>
          <h3 className="text-center mb-3">Invert a Square Matrix</h3>

          {/*The input matrix*/}
          <InputBox variant={"square"} matrix={{name: "A", matrix: A}} setMatrixFunction={setA} />

          {/*The container for the output*/}
          <div className="flex flex-col items-center">
            <button onClick={()=> setOutput(InvertMatrix(A))}>
              <div className="bg-orange-500 p-3 rounded-xl hover:cursor-pointer hover:inset-shadow-md hover:bg-orange-600 active:bg-orange-700">
                Invert
              </div>
            </button>
            {output && <MatrixOutputArea output_data={output}/>}
          </div>
        </div>
    )
}