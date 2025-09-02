import { Link, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  invoice_number: string;
  jenis_product: string;
  tanggal_masuk: string;
  status_autentikasi: string;
  keterangan: string;
}

function Rekapitulasi() {
  const [product, setProduct] = useState<Product[]>([]);
  const location = useLocation();
  const [notif, setNotif] = useState("");

  useEffect(() => {
    // Cek notifikasi
    if (location.state?.successMessage) {
      setNotif(location.state.successMessage);

      window.history.replaceState({}, document.title);

      const timeout = setTimeout(() => setNotif(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [location.state]);

  useEffect(() => {
    // Ambil data produk
    const getDataProduct = async () => {
      try {
        const res = await axios.get("http://localhost:1212/api/products/");
        const product = res.data.data;
        console.log(product);
        setProduct(product);
      } catch (err) {
        console.error("Gagal mengambil data produk:", err);
      }
    };

    getDataProduct();
  }, []);

  const formatTanggal = (tanggalString) => {
    const tanggal = new Date(tanggalString);
    return tanggal.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4 mx-4 my-20">
      <div>
        <h1 className="font-bold text-4xl">Rekapitulasi Autentikasi</h1>
      </div>

      <div className="bg-white border border-[#2f5597] p-4 shadow border-l-40">
        <h1 className="text-xl font-semibold">
          Seluruh produk yang akan diautentikasi akan ditampilkan di halaman
          ini!
        </h1>
      </div>

      <div className="p-2 flex">
        {notif && (
          <div className="font-bold mx-auto flex items-center gap-3 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800 shadow transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium">{notif}</span>
          </div>
        )}
      </div>

      <div className="bg-white border border-[#2f5597] shadow-lg w-full">
        <div className="p-2">
          <div className="flex justify-between items-center mb-2 border-b-gray-300 border-b-4">
            <div className="font-bold">Daftar Produk</div>
            <Link to="/tambah">
              <div className="bg-[#2f5597] flex items-center p-2 rounded-lg text-white mb-2">
                <AddIcon sx={{ fontSize: 20 }} />
                <p className="ml-1">Tambah Produk</p>
              </div>
            </Link>
          </div>

          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <p className="font-semibold">Show : </p>
              <select
                className="border-2 border-[#2f5597] p-2 rounded-lg"
                name=""
                id=""
              >
                <option value="admin">5</option>
                <option value="user">10</option>
                <option value="guest">100</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-semibold">Search: </p>
              <input
                className="border-2 border-[#2f5597] p-2 rounded-lg"
                type="search"
                name=""
                id=""
              />
            </div>
          </div>

          {/* WRAPPER untuk tabel */}
          <div className="overflow-auto w-full">
            <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm text-left">
              <thead className="bg-[#2f5597] text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">No</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Invoice Number
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Jenis Produk
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Tanggal Masuk
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Status Autentikasi
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Keterangan
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {product.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100 ">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{item.invoice_number}</td>
                    <td className="border px-4 py-2">{item.jenis_product}</td>
                    <td className="border px-4 py-2">
                      {formatTanggal(item.tanggal_masuk)}
                    </td>
                    <td
                      className={`border-black border px-4 py-2 font-semibold ${
                        item.status_autentikasi === "Terverifikasi"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.status_autentikasi}
                    </td>
                    <td className="border-black border px-4 py-2 text-green-600 font-semibold">
                      {item.keterangan}
                    </td>
                    <td className="px-4 py-2 text-sm font-semibold border border-black">
                      <div className="flex gap-4 text-white justify-center">
                        <Link to={`/detail/${item.invoice_number}`}>
                          <div className="bg-[#2f5597] p-2 rounded-sm">
                            Detail
                          </div>
                        </Link>
                        <div className="bg-[#2f5597] p-2 rounded-sm cursor-pointer">
                          Autentikasi
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rekapitulasi;
