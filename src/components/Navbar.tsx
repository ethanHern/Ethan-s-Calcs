import { useEffect, useRef, useState } from "react";
import LinkBox from "./LinkBox";

export default function Navbar() {
    const[matrixIsOpen, setMatrixIsOpen] = useState(false);

    const toggleMatrixDropdownOpen = () => setMatrixIsOpen(!matrixIsOpen);

    return (
        <nav className="flex items-center py-3 px-2 gap-x-2 shadow-sm">
            <LinkBox description="A normal calculator" link={'/calculator'} name='Calculator' rounded={true} />
            |
            {/* Matrix Dropdown */}
            <div className="relative">
                <div className={`flex items-center hover:inset-shadow-md overflow-hidden ${matrixIsOpen ? 'rounded-t-sm inset-shadow-md bg-gray-200' : 'rounded-sm'}`}>
                    <div className="border-r-2 border-gray-100 p-1 hover:bg-gray-200 hover:inset-shadow-sm">Matrix Calculators</div>
                    <div className="py-1 px-1 hover:bg-gray-200 hover:inset-shadow-sm" onClick={toggleMatrixDropdownOpen}>▼</div>
                </div>
                {matrixIsOpen && (
                    <div className="absolute w-full block bg-white rounded-b-sm border-r border-l border-b border-gray-400">
                        <LinkBox description={"Add or subtract two matrices"} link={'/matrix-calculator/add-sub'} name="Add/Sub"/>
                        <LinkBox description={"Multiply two matrices"} link={'/matrix-calculator/multiplication'} name="Multiplication" />
                        <LinkBox description={"Perform Gaussian or Gauss-Jordan Elimination on a matrix"} link={'/matrix-calculator/elimination'} name="Elimination" />
                        <LinkBox description={"Invert a matrix"} link={'/matrix-calculator/inverse'} name="Inverse" />
                    </div>
                )}
            </div>
        </nav>
    )
}