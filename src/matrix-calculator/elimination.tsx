import { useState } from "react";
import { type Matrix } from "../utils/matrix";
import InputBox from "../components/InputBox";
import { GaussianElimination, GaussJordanElimination, type MatrixOutputData } from "../utils/matrix-operations";
import { Helmet } from "react-helmet-async";
import MatrixOutputArea from "../components/MatrixOutputArea";
import Button from "../components/Button";

export default function Elimination() {
  const [A, setA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [output, setOutput] = useState<MatrixOutputData>();
  const [eliminationMode, setEliminationMode] = useState<boolean>(false); // False = Gaussian, True = Gauss-Jordan

  const clearOutput = () => {
    setOutput(undefined);
  }
    return (
        <div className="mt-2 flex-col">
          <Helmet>
            <title>Elimination - Matrix Calculator | Ethan's Calcs</title>
          </Helmet>

          {/* The container for the mode switcher button */}
          <div className="grid grid-cols-2 w-fit justify-self-center overflow-hidden rounded-2xl bg-red-400 border-2 border-black">
            <button onClick={()=>{
              setEliminationMode(false);
              clearOutput();
            }}>
              <div className={`grow p-1 px-2 ${!eliminationMode ? "bg-gray-700 text-white" : "bg-white text-black hover:cursor-pointer hover:inset-shadow-md"}`}>Gaussian</div>
            </button>
            <button onClick={()=>{
              setEliminationMode(true);
              clearOutput();
            }}>
              <div className={`grow p-1 px-2 ${eliminationMode ? "bg-gray-700 text-white": "bg-white text-black hover:cursor-pointer hover:inset-shadow-md"}`}>Gauss-Jordan</div>
            </button>
          </div>

          <h1 className="font-extrabold text-4xl text-center">{eliminationMode ? "Gauss-Jordan Elimination" : "Gaussian Elimination"}</h1>
          <h3 className="text-center mb-3">{eliminationMode ?
            "Perform Gauss-Jordan Elimination on a matrix to bring it into Reduced Row Echelon Form (RREF)" :
            "Perform Gaussian Elimination on a matrix to bring it into Row Echelon Form (REF)"}
          </h3>

          {/*The input matrix*/}
          <InputBox variant={"default"} matrix={{name: "A", matrix: A}} setMatrixFunction={setA} />

          {/*The container for the output*/}
          <div className="flex flex-col items-center">
            <Button color="orange" name="Eliminate"
              onClick={()=> {
                if (eliminationMode) {
                  setOutput(GaussJordanElimination(A));
                }
                else {
                  setOutput(GaussianElimination(A));
                }
              }}
            />
            {output && <MatrixOutputArea output_data={output} />}
          </div>
        </div>
    )
}