import { Link } from "react-router-dom";

function successRegister() {
  return (
    <div className="flex items-center justify-center my-72">
      <div className="text-center bg-white space-y-6 border-white border-4 p-16 rounded-md shadow-2xl">
        <h1 className="text-4xl font-bold mb-2">Selamat!</h1>
        <h1 className="text-3xl">Akun Anda telah aktif</h1>
        <Link to="/login">
          <div className="flex justify-center">
            <button className="w-full bg-[#2f5597] text-white font-extrabold rounded-lg px-4 py-2 border-2 border-[#4472c4] hover:bg-[#264479] transition">
              Sign in
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default successRegister;
