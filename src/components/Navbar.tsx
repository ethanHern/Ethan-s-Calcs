import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const[matrixIsOpen, setMatrixIsOpen] = useState(false);

    

    return (
        <nav className="flex items-center py-3 px-2 gap-x-2 shadow-sm">
            {/* Matrix Dropdown */}
            <div className="flex items-center m-1 hover:inset-shadow-md">
                <div className="border-r-2 p-1 hover:bg-gray-200 hover:inset-shadow-sm">Matrix Calculators</div>
                <div className="py-1 px-1 hover:bg-gray-200 hover:inset-shadow-md" onClick={()=>{setMatrixIsOpen(!matrixIsOpen)}}>▼</div>
            </div>
            <Link title={"Add or subtract two matrices"} to={'/matrix-calculator/add-sub'} className="hover:text-shadow-md">Add/Sub</Link>
            |
            <Link title={"Multiply two matrices"} to={'/matrix-calculator/multiplication'} className="hover:text-shadow-md">Multiplication</Link>
            |
            <Link title={"Perform Gaussian or Gauss-Jordan Elimination on a matrix"} to={'/matrix-calculator/elimination'} className="hover:text-shadow-md">Elimination</Link>
            |
            <Link title={"Invert a matrix"} to={'/matrix-calculator/inverse'} className="hover:text-shadow-md">Inverse</Link>
        </nav>
    )
}