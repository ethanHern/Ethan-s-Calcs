import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import AddSub from "./matrix-calculator/add-sub";
import Navbar from "./components/Navbar";

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/matrix-calculator" element={<Home/>} />
          <Route path="/matrix-calculator/add-sub" element={<AddSub/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}