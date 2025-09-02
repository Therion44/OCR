import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const register = () => {
  const [frontname, setFrontname] = useState("");
  const [backname, setBackname] = useState("");
  const [username, setUsername] = useState("");
  const [posisi, setPosisi] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const postData = async () => {
    const userData = {
      frontname,
      backname,
      username,
      role: posisi,
      password,
    };
    try {
      await axios.post("http://localhost:1212/api/register", userData);
      navigate("/success", {
        state: { successMessage: "Produk berhasil ditambahkan!" },
      });
    } catch (err) {
      console.error("Gagal mengirim data:", err);
    }
  };
  return (
    <div className="flex justify-center my-40 mx-auto">
      <div className=" shadow-2xl rounded-xl bg-white  p-8 w-full space-y-4 max-w-2xl">
        <h1 className="text-3xl font-extrabold text-center mb-6">
          Register Now
        </h1>
        <p className="flex justify-center text-center text-xl my-4">
          Silahkan Masukkan informasi Anda untuk mendaftarkan akun autentikasi{" "}
        </p>
        <div className="flex space-x-4 items-center ">
          <input
            className="text-xl border-b-2 focus:outline-none focus:border-blue-600 border-gray-300 px-4 py-2 w-full"
            type="text"
            placeholder="Nama depan"
            value={frontname}
            onChange={(e) => setFrontname(e.target.value)}
          />
          <input
            className="text-xl  border-gray-300 border-b-2 focus:outline-none focus:border-blue-600 px-4 py-2 w-full"
            type="text"
            placeholder="Nama belakang"
            value={backname}
            onChange={(e) => setBackname(e.target.value)}
          />
        </div>
        <div>
          <input
            className="text-xl border-gray-300 border-b-2 focus:outline-none focus:border-blue-600  px-4 py-2 w-full"
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold ">Pilih Posisi :</h1>
          <select
            className="text-xl border-gray-300 border-b-2 focus:outline-none focus:border-blue-600  px-4 py-2 w-full"
            defaultValue=""
            value={posisi}
            onChange={(e) => setPosisi(e.target.value)}
          >
            <option value="" disabled>
              Pilih Posisi anda
            </option>
            <option value="Petugas Administrasi">Petugas Administrasi</option>
            <option value="Petugas Lapangan">Petugas Lapangan</option>
            <option value="Petugas Laboratorium">Petugas Laboratorium</option>
            <option value="Kepala Departemen">Kepala Departemen</option>
          </select>
        </div>
        <div>
          <input
            className="text-xl  border-gray-300 border-b-2 focus:outline-none focus:border-blue-600  px-4 py-2 w-full"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={postData}
            className="w-full  font-bold bg-[#2f5597] text-white  px-4 py-2  hover:bg-[#264479] transition"
          >
            Register
          </button>
        </div>
        <Link to="/login">
          <div className="flex font-medium">
            <p className="mx-auto items-center">
              Sudah punya akun?{" "}
              <span className="text-blue-500">Login Sekarang</span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default register;
