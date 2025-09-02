import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cek login saat komponen dimount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // arahkan ke homepage atau login page
  };

  return (
    <div className="bg-gray-300">
      <div className="bg-gray-300 flex container mx-auto justify-end">
        <ul className="m-2 flex space-x-8 text-xl items-center">
          <li>Panduan</li>
          <li>Tentang</li>
          {isLoggedIn ? (
            <li>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white font-extrabold rounded-lg px-4 py-2 border-2 border-red-700 hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            </li>
          ) : (
            <Link to="/register">
              <li>
                <button className="bg-[#2f5597] text-white font-extrabold rounded-lg px-4 py-2 border-2 border-[#4472c4] hover:bg-[#264479] transition">
                  Register
                </button>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
