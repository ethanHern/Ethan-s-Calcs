import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import AddSub from "./matrix-calculator/add-sub";
import Navbar from "./components/Navbar";
import Calculator from "./calculator";
import Multiplication from "./matrix-calculator/multiplication";
import MatrixHome from "./matrix-home";
import Elimination from "./matrix-calculator/elimination";
import Inverse from "./matrix-calculator/inverse";

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/calculator" element={<Calculator/>}/>
          <Route path="/matrix-calculator" element={<MatrixHome/>} />
          <Route path="/matrix-calculator/add-sub" element={<AddSub/>}/>
          <Route path="/matrix-calculator/multiplication" element={<Multiplication/>}/>
          <Route path="/matrix-calculator/elimination" element={<Elimination/>}/>
          <Route path="/matrix-calculator/inverse" element={<Inverse/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}