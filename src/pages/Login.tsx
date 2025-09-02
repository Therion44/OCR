import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const postData = async () => {
    const userData = {
      username,
      password,
    };
    try {
      const res = await axios.post("http://localhost:1212/api/login", userData);
      localStorage.setItem("token", res.data.token);
      navigate("/", {
        state: { successMessage: "Produk berhasil ditambahkan!" },
      });
    } catch (err) {
      console.error("Gagal mengirim data:", err);
    }
  };
  return (
    <div className="flex justify-center my-40 mx-auto">
      <div className=" shadow-2xl rounded-xl bg-white  p-8 w-full space-y-4 max-w-xl">
        <h1 className="text-3xl font-extrabold text-center mb-6">
          Platform Digital Autentikasi Halal Badan Karantina
        </h1>
        <p className="flex justify-center text-center text-xl my-4">
          Masuk untuk melakukan autentikasi produk!
        </p>
        <div className="space-y-4 max-w-sm w-full mx-auto">
          <input
            className="text-xl w-full border-gray-300 border-b-2 focus:outline-none focus:border-blue-600 px-4 py-2"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="text-xl w-full border-gray-300 border-b-2 focus:outline-none focus:border-blue-600 px-4 py-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={postData}
            className="w-full bg-[#2f5597] text-white font-extrabold rounded-lg px-4 py-2 border-2 border-[#4472c4] hover:bg-[#264479] transition"
          >
            Sign in
          </button>
          <Link to="/register">
            <div className="flex font-medium">
              <p className="mx-auto items-center">
                Belum punya akun?{" "}
                <span className="text-blue-500">Daftar Sekarang</span>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
