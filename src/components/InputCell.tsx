import { useState } from "react";
import { CleanExpression } from "../utils/arg_parsing/lexer";

export default function InputCell() {
    const [input, setInput] = useState<string>("");


    return (
        <div className="flex flex-col">
            <input className="inset-shadow-md" onChange={(e)=>{setInput(e.target.value)}}/>
            <button onClick={()=>{
                console.log(input);
                console.log(CleanExpression(input));
                }}>Check Input</button>
        </div>
    )
}