import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Success from "./pages/Success_Register";
import Rekapitulasi from "./pages/Rekapitulasi";
import Detail from "./pages/Detail";
import Tambah_Produk from "./pages/Tambah_Produk";
import Administratif from "./pages/Administratif";
import Detail_Autentikasi from "./pages/Detail_Autentikasi";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/rekapitulasi" element={<Rekapitulasi />} />
        <Route path="/detail/:invoice_number" element={<Detail />} />
        <Route path="/tambah" element={<Tambah_Produk />} />
        <Route path="/administratif" element={<Administratif />} />
        <Route path="/detail_autentikasi" element={<Detail_Autentikasi />} />
      </Routes>
    </>
  );
}

export default App;
