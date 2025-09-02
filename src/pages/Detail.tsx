import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function Detail() {
  const [data, setData] = useState({});
  const { invoice_number } = useParams();

  useEffect(() => {
    // Ambil data produk
    const getDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1212/api/products/${invoice_number}`
        );
        const detail = res.data;
        setData(detail);
        console.log(res.data.tanggal_masuk);
      } catch (err) {
        console.error("Gagal mengambil data produk:", err);
      }
    };

    getDetail();
  }, []);

  const formatTanggal = (tanggalString) => {
    if (!tanggalString) return ""; // kalau kosong, kembalikan string kosong
    const date = new Date(tanggalString);
    if (isNaN(date.getTime())) return ""; // kalau tanggal invalid, kembalikan string kosong juga
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-4 mx-4 my-20">
      <div>
        <h1 className="font-bold text-4xl">Detail Autentikasi</h1>
      </div>

      <div className="bg-white border border-[#2f5597] p-4 shadow border-l-40">
        <p className=" text-lg">
          Detail dari progress autentikasi produk yang dipilih ditunjukkan dalam
          halaman ini
        </p>
      </div>

      <div className="bg-white border border-[#2f5597] shadow-lg">
        <div className="p-4 space-y-4">
          <div className="w-full border-b-gray-300 border-b-2">
            <p className="">Invoice Number : {data.invoice_number} </p>
          </div>
          <div>
            <p>Tanggal Masuk : {formatTanggal(data.tanggal_masuk)}</p>
            <p>Status Autentikasi : 4/4</p>
          </div>

          <div>Disini PDF</div>

          <div className="overflow-auto w-full">
            <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm text-left">
              <thead className="bg-[#2f5597] text-white text-lg">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">
                    Autentikasi
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Tanggal Autentikasi
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Penanggung Jawab
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Keterangan
                  </th>
                </tr>
              </thead>

              <tbody className="text-lg">
                {data.autentikasi?.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      Autentikasi {item.jenis_autentikasi}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div
                        className={`text-white rounded-sm w-fit px-4 ${
                          item.status === "Lolos"
                            ? "bg-green-600"
                            : item.status === "Tidak Lolos"
                            ? "bg-red-400"
                            : "bg-gray-400"
                        }`}
                      >
                        {item.status}
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatTanggal(item.tanggal_autentikasi)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.penanggung_jawab}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-black ">
                      {item.keterangan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <Link to="/rekapitulasi">
              <button className="bg-gray-500 rounded-sm text-white text-lg font-bold p-2">
                Kembali
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
