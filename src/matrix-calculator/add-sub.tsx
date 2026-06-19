import InputBox from "../components/InputBox";
import OutputBox from "../components/OutputBox";
import { GetMatrixColumns, GetMatrixRows, type Matrix } from "../utils/matrix";
import { useState } from "react";
import { AddMatrices, SubtractMatrices } from "../utils/matrix-operations";
import { Helmet } from "react-helmet-async";

export default function AddSub() {
  const [A, setA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [B, setB] = useState<Matrix>([[0, 0], [0, 0]]);
  const [output, setOutput] = useState<Matrix>();
  const [mode, setMode] = useState<boolean>(false); // False = Addition, True = Subtraction
  const [opPossible, SetOpPossible] = useState<boolean>(true);

  const clearSteps = () => {
    setOutput(undefined);
  }
    return (
        <div className="mt-2 flex-col">
            <Helmet>
                <title>Matrix Calculator - Add/Sub | Ethan's Calcs</title>
            </Helmet>
            {/* The container for the mode switcher button */}
            <div className="grid grid-cols-2 w-fit justify-self-center overflow-hidden rounded-2xl bg-red-400 border-2 border-black">
                <button onClick={()=>{
                    setMode(false);
                    clearSteps();
                    }}>
                        <div className={`grow p-1 px-2 ${!mode ? "bg-gray-700 text-white" : "bg-white text-black hover:cursor-pointer hover:inset-shadow-md"}`}>Addition</div>
                </button>
                <button onClick={()=>{
                    setMode(true);
                    clearSteps();
                }}>
                    <div className={`grow p-1 px-2 ${mode ? "bg-gray-700 text-white": "bg-white text-black hover:cursor-pointer hover:inset-shadow-md"}`}>Subtraction</div>
                </button>
            </div>
            
            <h1 className="font-extrabold text-4xl text-center">{mode ? "Subtraction" : "Addition"}</h1>
            <h3 className="text-center mb-3">{mode ?
                "Subtract a matrix B from a matrix A (dimensions must match)" :
                "Add a matrix A to a matrix B (dimensions must match)"
                }
            </h3>
            {/*The container for the input matrices*/}
            <div className="flex px-16 min-w-screen">
                {/*Input A*/}
                <InputBox variant="default" matrix={A} matrixName={"A"} setMatrixFunction={setA}/>

                {/*The swap button*/}
                <button onClick={()=>{setA(B); setB(A);}}>
                <div className="bg-gray-300 rounded-xl p-3 hover:inset-shadow-md hover:cursor-pointer hover:bg-gray-400">Swap</div>
                </button>

                {/*Input B*/}
                <InputBox variant="default" matrix={B} matrixName={"B"} setMatrixFunction={setB}/>
            </div>

            {/*The container for the output*/}
            <div className="flex flex-col items-center">
            <button onClick={()=> {
                if ((GetMatrixColumns(A) != GetMatrixColumns(B)) || (GetMatrixRows(A) != GetMatrixRows(B))) { // If the dimensions do not match
                    SetOpPossible(false);
                    return;
                }
                if (mode) {
                    setOutput(SubtractMatrices(A, B));
                    SetOpPossible(true);
                }
                else {
                    setOutput(AddMatrices(A, B));
                    SetOpPossible(true);
                }
            }}>
                <div className="bg-orange-500 p-3 rounded-xl hover:cursor-pointer hover:inset-shadow-md hover:bg-orange-600 active:bg-orange-700">
                {mode ? "Subtract" : "Add"}
                </div>
            </button>

            {/*This element only displays when the matrices are not eligible for addition or subtraction*/}
            {!opPossible && <p className="text-red-500">The dimensions of A must match the dimensions of B!</p>}

            {output && <OutputBox rows={GetMatrixRows(output)} columns={GetMatrixColumns(output)} output={output} matrixName="output" showName={false}/>}
        </div>
    </div>
    )
}