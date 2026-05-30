import { AddColumn, AddRow, GetMatrixColumns, GetMatrixRows, type Matrix, RemoveColumn, RemoveRow } from "../utils/matrix";
import { type SetStateAction } from "react";
import Brace from "./Brace";
import { ReadCSV } from "../utils/csv_ops";

type InputProps = {
    variant: "default" | "square",
    matrix: Matrix,
    matrixName: string,
    setMatrixFunction: (value: SetStateAction<Matrix>) => void,
}
export default function InputBox({variant, matrix, matrixName, setMatrixFunction}: InputProps) {

    return (
    <div className="p-2 gap-y-1.5 flex-1">
      {/* Matrix title */}
      <p className="text-4xl font-extrabold font-serif text-center">{matrixName}</p>

      {/* Buttons to set rows and columns */}
      {variant == "default" &&
      <div id={`Buttons-${matrixName}`} className="flex gap-2 justify-center">
        {/* Row Buttons */}
        <div id={`Rows-${matrixName}`} className="flex gap-1">
          <p>Rows:</p>
          <button onClick={()=> {
            setMatrixFunction(RemoveRow(matrix));
          }}>
            <div className="bg-red-500 px-4 rounded-xl font-bold hover:cursor-pointer hover:inset-shadow-md hover:bg-red-600 active:bg-red-700">
              -
            </div>
          </button>
          {GetMatrixRows(matrix)}
          <button onClick={()=> {
            setMatrixFunction(AddRow(matrix));
            }}>
            <div className="bg-green-500 px-4 rounded-xl font-bold hover:cursor-pointer hover:inset-shadow-md hover:bg-green-600 active:bg-green-700">
              +
            </div>
          </button>
        </div>
        {/* Column Buttons */}
        <div id={`Columns-${matrixName}`} className="flex gap-1">
          <p>Columns:</p>
          <button onClick={()=> {
            setMatrixFunction(RemoveColumn(matrix));
          }}>
            <div className="bg-red-500 px-4 rounded-xl font-bold hover:cursor-pointer hover:inset-shadow-md hover:bg-red-600 active:bg-red-700">
              -
            </div>
          </button>
          {GetMatrixColumns(matrix)}
          <button onClick={()=> {
            setMatrixFunction(AddColumn(matrix));
            }}>
            <div className="bg-green-500 px-4 rounded-xl font-bold hover:cursor-pointer hover:inset-shadow-md hover:bg-green-600 active:bg-green-700">
              +
            </div>
          </button>
        </div>
      </div>
      }
      {variant == "square" &&
      <div id={`Buttons-${matrixName}`} className="flex gap-2 justify-center">
        <div id={`Size-${matrixName}`} className="flex gap-1">
          <p>Size:</p>
          <button onClick={()=> {
            let a = RemoveRow(matrix);
            a = RemoveColumn(a);
            setMatrixFunction(a);
          }}>
            <div className="bg-red-500 px-4 rounded-xl font-bold hover:cursor-pointer hover:inset-shadow-md hover:bg-red-600 active:bg-red-700">
              -
            </div>
          </button>
          {GetMatrixRows(matrix)}
          <button onClick={()=> {
            let a = AddRow(matrix);
            a = AddColumn(a);
            setMatrixFunction(a);
            }}>
            <div className="bg-green-500 px-4 rounded-xl font-bold hover:cursor-pointer hover:inset-shadow-md hover:bg-green-600 active:bg-green-700">
              +
            </div>
          </button>
        </div>
      </div>
      }
      {/* The input container */}
      <div className="flex max-w-xl h-fit justify-self-center items-stretch py-1">
        <Brace matrixName={matrixName} side="left"/>
        <div id="matrix" className="overflow-x-auto py-2 justify-center">
          {matrix && matrix.map((row: number[], rowIndex: number)=>(
            <div key={`${matrixName}-${rowIndex}`} className="flex gap-2 my-1">
              {row.map((cell, cellIndex)=>(
                <input title={`${matrixName}[${rowIndex + 1}, ${cellIndex + 1}]`} key={`${matrixName}-${cellIndex}`} type={"number"} value={cell} onChange={(e)=>{
                  let temp = matrix.map((r: number[]) => [...r]);
                  temp[rowIndex][cellIndex]=e.target.valueAsNumber;
                  setMatrixFunction(temp);
                }}
                className={`hover:inset-shadow-md w-22.5 rounded-xs ${rowIndex % 2 == 0 ? `bg-gray-100`: `bg-white`} text-center`}
                />
              ))}
            </div>
          ))}
        </div>
        <Brace matrixName={matrixName} side="right" />
      </div>

      {/* The Clear button */}
      <div className="flex-row justify-self-center gap-2">
        <input id={`${matrixName}-input`} type='file' accept=".csv, .txt" hidden={true} multiple={false} onChange={(event)=>{
          const file = event.target.files;
          if (file) {
            let data = file[0];
            ReadCSV(data, setMatrixFunction);
          }
        }}/>
        <button onClick={()=>{
          const inputFile = document.getElementById(`${matrixName}-input`) as HTMLInputElement;
          if (inputFile) {
            inputFile.click();
          }
        }}>
          <div className="rounded-xl px-2 p-1 bg-gray-800 text-white">
            <h3>Import CSV</h3>
          </div>
        </button>
        <button onClick={()=> {
          if (confirm(`Are you sure you want to clear Matrix ${matrixName}?`)) {
            setMatrixFunction(Array(GetMatrixRows(matrix)).fill(null).map(()=> Array(GetMatrixColumns(matrix)).fill(0)));
          }
        }}>
          <div className="rounded-xl px-2 p-1 bg-red-600 text-white">
            <h3>Clear</h3>
          </div>
        </button>
      </div>
    </div>)
}