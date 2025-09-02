import AddIcon from "@mui/icons-material/Add";

function Administratif() {
  return (
    <div className="space-y-4 mx-4 my-20">
      <div>
        <h1 className="font-bold text-4xl">Autentikasi Administratif</h1>
      </div>

      <div className="bg-white border border-[#2f5597] p-4 shadow border-l-40">
        <h1 className="text-xl font-semibold">
          Seluruh produk yang akan diautentikasi akan ditampilkan di halaman
          ini!
        </h1>
      </div>

      <div className="bg-white border border-[#2f5597] shadow-lg w-full">
        <div className="p-2">
          <div className="flex justify-between items-center mb-2 border-b-gray-300 border-b-4">
            <div className="font-bold">Daftar Produk</div>
            <div className="bg-[#2f5597] flex items-center p-2 rounded-lg text-white mb-2">
              <AddIcon sx={{ fontSize: 20 }} />
              <p className="ml-1">Tambah Produk</p>
            </div>
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
                <tr className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">1</td>
                  <td className="border border-gray-300 px-4 py-2">1002012</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Daging Sapi
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Rabu, 14 Mei 2025
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">
                    Aktif
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">
                    On-Process Autentikasi Admninistratif
                  </td>
                  <td className="px-4 py-2 text-sm font-semibold">
                    <div className="flex gap-4 text-white justify-center">
                      <div className="bg-[#2f5597] p-2 rounded-sm">Detail</div>
                      <div className="bg-[#2f5597] p-2 rounded-sm">
                        Autentikasi
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">2</td>
                  <td className="border border-gray-300 px-4 py-2">1002913</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Daging Sapi
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Selasa, 13 Mei 2025
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">
                    Aktif
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">
                    On-Process Autentikasi Kontainer
                  </td>
                  <td className="px-4 py-2 border-gray-300 border text-sm font-semibold">
                    <div className="flex gap-4 text-white justify-center">
                      <div className="bg-[#2f5597] p-2 rounded-sm">Detail</div>
                      <div className="bg-[#2f5597] p-2 rounded-sm">
                        Autentikasi
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Administratif;
