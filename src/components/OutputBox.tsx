import type { Matrix } from "../utils/matrix.ts";
import Brace from "./Brace";

type OutputProps = {
    rows: number,
    columns: number,
    output: Matrix,
    matrixName: string,
    showName: boolean,
}
export default function OutputBox({rows, columns, output, matrixName, showName}: OutputProps) {
    return (
        <div className="p-2 gap-y-1.5" id={matrixName}>
            {showName && <p className="text-4xl font-extrabold font-serif text-center">{matrixName}</p>}
            <div className="flex h-fit justify-self-center py-2">
                <Brace matrixName={matrixName} side="left" />
                <div className="grid py-2" style={{gridTemplateColumns: `repeat(${columns}, auto)`, gridTemplateRows: `repeat(${rows}, auto)`,}}>
                    {output && output.map((row, rowIndex)=>(
                        row.map((cell, cellIndex)=>(
                        <div key={`Output-${rowIndex}-${cellIndex}`} title={`[${rowIndex + 1}, ${cellIndex + 1}]`} className={`p-3 rounded-sm shadow ${rowIndex % 2 == 0 ? `bg-gray-300` : `bg-white`}`}>{cell}</div>
                    ))
                    ))}
                </div>
                <Brace matrixName={matrixName} side="right" />
            </div>
        </div>

    )
}