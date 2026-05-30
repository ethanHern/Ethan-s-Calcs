import InputBox from "@/components/InputBox";
import OutputBox from "@/components/OutputBox";
import { InvertMatrix } from "@/utils/advanced-operations";
import { GetMatrixColumns, GetMatrixRows, Matrix } from "@/utils/elementary-operations";
import { useState } from "react";

export default function Inverse() {
  const [A, setA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [blockMatrix, setBlockMatrix] = useState<Matrix>();
  const [gaussJordanForm, setGaussJordanForm] = useState<Matrix>();
  const [output, setOutput] = useState<Matrix>();
  const [failed, setFailed] = useState<boolean>(false);
  const [showSteps, setShowSteps] = useState<boolean>(false);

    return (
        <div className="mt-2 flex-col">
          <h1 className="font-extrabold text-4xl text-center">Inverse Matrix</h1>
          <h3 className="text-center mb-3">Invert a Square Matrix</h3>

          {/*The input matrix*/}
          <InputBox variant={"square"} matrix={A} matrixName="A" setMatrixFunction={setA} />

          {/*The container for the output*/}
          <div className="flex flex-col items-center">
            <button onClick={()=> {
                let data = InvertMatrix(A);
                setBlockMatrix(data.block_matrix);
                setGaussJordanForm(data.gauss_jordan_form);
                if (data.result) {setOutput(data.result);}
                setFailed(data.failed);
            }}>
              <div className="bg-orange-500 p-3 rounded-xl hover:cursor-pointer hover:inset-shadow-md hover:bg-orange-600 active:bg-orange-700">
                Invert
              </div>
            </button>
            {failed &&
            <div className="text-center justify-self-center">
              <p>Inversion Failed! (Elimination failed)</p>
              <p>Below is the last step before failure</p>
            </div>
            }
            {output && <OutputBox rows={GetMatrixRows(output)} columns={GetMatrixColumns(output)} output={output} matrixName="output" showName={false}/>}

            {/* Displays the steps */}
            {output &&
              <button onClick={()=> {
                setShowSteps(!showSteps);
              }}>
                <div>
                  <p>{showSteps ? "Hide Elimination Steps" : "Show Elimination Steps"}</p>
                </div>
              </button>
            }
            {showSteps &&
              <div className="my-5">
                {output && <OutputBox rows={GetMatrixRows(A)} columns={GetMatrixColumns(A)} output={A} matrixName={"Starting Matrix"} showName={true}/>}
                {blockMatrix && <OutputBox rows ={GetMatrixRows(blockMatrix)} columns={GetMatrixColumns(blockMatrix)} output={blockMatrix} matrixName={"Step 1: Block matrix with Identity matrix"} showName={true}/>}
                {gaussJordanForm && <OutputBox rows ={GetMatrixRows(gaussJordanForm)} columns={GetMatrixColumns(gaussJordanForm)} output={gaussJordanForm} matrixName={"Step 2: Gauss-Jordan Elimination"} showName={true}/>}
                {output && <OutputBox rows ={GetMatrixRows(output)} columns={GetMatrixColumns(output)} output={output} matrixName={"Step 3: Extract right side of block matrix (A inverse)"} showName={true}/>}
              </div>
            }
          </div>
        </div>
    )
}