import { useState } from "react";
import { type Matrix } from "../utils/matrix";
import InputBox from "../components/InputBox";
import { MultiplyMatrices, type MatrixOutputData } from "../utils/matrix-operations";
import { Helmet } from "react-helmet-async";
import Button from "../components/Button";
import MatrixOutputArea from "../components/MatrixOutputArea";


export default function Multiplication() {
  const [A, setA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [B, setB] = useState<Matrix>([[0, 0], [0, 0]]);
  const [output, setOutput] = useState<MatrixOutputData>();

  const clearOutput = () => {
    setOutput(undefined);
  }

  return (
    <div className="mt-2 flex-col">
      <Helmet>
        <title>Matrix Calculator - Multiplication | Ethan's Calcs</title>
      </Helmet>
      <h1 className="font-extrabold text-4xl text-center">Matrix Multiplication</h1>
      <h3 className="text-center mb-3">Multiply a matrix A by another matrix B</h3>

      {/*The container for the input matrices*/}
      <div className="flex px-16 min-w-screen">
        {/*Input A*/}
        <InputBox variant="default" matrix={{name: "A", matrix: A}} setMatrixFunction={setA}/>

        {/*The swap button*/}
        <button onClick={()=>{setA(B); setB(A);}}>
          <div className="bg-gray-300 rounded-xl p-3 hover:inset-shadow-md hover:cursor-pointer hover:bg-gray-400">Swap</div>
        </button>

        {/*Input B*/}
        <InputBox variant="default" matrix={{name: "B", matrix: B}} setMatrixFunction={setB}/>
      </div>

      {/*The container for the output*/}
      <div className="flex flex-col items-center">
        {/*The Set button*/}
        <Button color="orange" name="Multiply"
        onClick={()=> {
          let data = MultiplyMatrices(A, B);
          setOutput(data);
          if (data.failed) {clearOutput}
        }}/>
        {output && <MatrixOutputArea output_data={output}/>}
      </div>
    </div>
  )
}