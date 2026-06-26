import { useState } from "react";
import { type MatrixOutputData } from "../utils/matrix-operations";
import Button from "./Button";
import OutputBox from "./OutputBox";

type outputProps = {output_data: MatrixOutputData}
export default function MatrixOutputArea({output_data}: outputProps) {

    const [showSteps, setShowSteps] = useState<boolean>(false);


    return (
        <div className="flex flex-col items-center">
            {/*Display the failure message*/}
            {output_data.failed && 
            (
                <div className="text-center justify-self-center">
                    <p>{output_data.failed.failure_message}</p>
                    {output_data.steps && <p>Below is the last step before failure</p>}
                </div>
            )}

            {/*Display the final result*/}
            <div className="flex flex-row">
                {output_data.result.map((result)=>(
                <OutputBox key={result.name} rows={result.size!.rows} columns={result.size!.cols} output={result.matrix} showName={false} matrixName={result.name}/>
            ))}
            </div>

            {/*Button to toggle display of steps (if there are steps)*/}
            {output_data.steps &&
                <Button name="Show Steps" color={"gray_light"}
                    onClick={()=>setShowSteps(!showSteps)}
                />
            }
            {/*Display the steps (if there are steps)*/}
            {showSteps &&
            (
                <div>
                    {output_data.steps && output_data.steps.map((step)=>(
                        <OutputBox key={step.name} rows={step.size!.rows} columns={step.size!.cols} output={step.matrix} showName={true} matrixName={step.name}/>
                    ))}
                </div>
            )}

        </div>
    )
}