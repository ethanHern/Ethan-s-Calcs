import { useState } from "react";
import { type Matrix } from "../utils/matrix";
import InputBox from "../components/InputBox";
import { GramSchmidt, type MatrixOutputData } from "../utils/matrix-operations";
import { Helmet } from "react-helmet-async";
import MatrixOutputArea from "../components/MatrixOutputArea";
import Button from "../components/Button";

export default function QRFactorization() {
  const [A, setA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [output, setOutput] = useState<MatrixOutputData>();

    return (
        <div className="mt-2 flex-col">
          <Helmet>
            <title>QR Factorization - Matrix Calculator | Ethan's Calcs</title>
          </Helmet>
          <h1 className="font-extrabold text-4xl text-center">QR Factorization</h1>
          <h3 className="text-center mb-3">Do QR Factorization idk</h3>

          {/*The input matrix*/}
          <InputBox variant={"default"} matrix={{name: "A", matrix: A}} setMatrixFunction={setA} />

          {/*The container for the output*/}
          <div className="flex flex-col items-center">
            <Button color="orange" name="Calculate"
                onClick={()=>{
                    setOutput(GramSchmidt(A));
                }}
                />
            {output && <MatrixOutputArea output_data={output}/>}
          </div>
        </div>
    )
}