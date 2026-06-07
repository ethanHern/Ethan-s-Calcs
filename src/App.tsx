import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import AddSub from "./matrix-calculator/add-sub";
import Navbar from "./components/Navbar";
import Calculator from "./calculator";

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/calculator" element={<Calculator/>}/>
          <Route path="/matrix-calculator" element={<Home/>} />
          <Route path="/matrix-calculator/add-sub" element={<AddSub/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}