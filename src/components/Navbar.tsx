import { Link } from "react-router-dom";

export default function Navbar() {
    

    return (
        <nav className="flex py-3 px-2 gap-x-2 shadow-sm">
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