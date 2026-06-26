import InputBox from "../components/InputBox";
import { type Matrix } from "../utils/matrix";
import { useState } from "react";
import { AddMatrices, SubtractMatrices, type MatrixOutputData } from "../utils/matrix-operations";
import { Helmet } from "react-helmet-async";
import Button from "../components/Button";
import MatrixOutputArea from "../components/MatrixOutputArea";


export default function AddSub() {
  const [A, setA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [B, setB] = useState<Matrix>([[0, 0], [0, 0]]);
  const [output, setOutput] = useState<MatrixOutputData>();
  const [mode, setMode] = useState<boolean>(false); // False = Addition, True = Subtraction

  const clearSteps = () => {
    setOutput(undefined);
  }
    return (
        <div className="mt-2 flex-col">
            <Helmet>
                <title>Add/Sub - Matrix Calculator | Ethan's Calcs</title>
            </Helmet>
            {/* The container for the mode switcher button */}
            <div className="grid grid-cols-2 w-fit justify-self-center overflow-hidden rounded-2xl border-2 border-black">
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
                <InputBox variant="default" matrix={{name: "A", matrix: A}} setMatrixFunction={setA}/>

                {/*The swap button*/}
                <Button 
                    color="gray_light" name="Swap" additional_styling="p-3"
                    onClick={()=>{setA(B); setB(A);}}/>
                {/*Input B*/}
                <InputBox variant="default" matrix={{name: "B", matrix: B}} setMatrixFunction={setB}/>
            </div>

            {/*The container for the output*/}
            <div className="flex flex-col items-center">
            <Button name={mode ? "Subtract" : "Add"} color="orange"
            onClick={()=> {
                if (mode) {
                    setOutput(SubtractMatrices(A, B));
                }
                else {
                    setOutput(AddMatrices(A, B));
                }
            }}/>
            {output && <MatrixOutputArea output_data={output} />}
        </div>
    </div>
    )
}