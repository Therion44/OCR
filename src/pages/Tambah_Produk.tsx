import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Tambah_Produk() {
  const [jenisProdukList, setJenisProdukList] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [jenisProduk, setJenisProduk] = useState("Daging Sapi");
  const [tanggalMasuk, setTanggalMasuk] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [isSubmited, setIsSubmited] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!invoiceNumber.trim() || !jenisProduk.trim() || !tanggalMasuk.trim()) {
      return false; // berarti ada error
    }
    return true; // semua valid
  };

  useEffect(() => {
    const fetchJenisProduk = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1212/api/products/jenis-product"
        );
        console.log(res);
        setJenisProdukList(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJenisProduk();
  }, []);

  const handleSubmit = async () => {
    setIsSubmited(true);
    if (!validate()) return;

    const formData = new FormData();
    formData.append("invoice_number", invoiceNumber);
    formData.append("jenis_product", jenisProduk);
    formData.append("tanggal_masuk", tanggalMasuk);
    formData.append("status_autentikasi", "Belum Dilakukan");
    formData.append("keterangan", "On-Process Autentikasi Administratif");
    formData.append("dokumen", pdfFile); // nama field disesuaikan dengan backend

    try {
      const res = await axios.post(
        "http://localhost:1212/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Data berhasil dikirim:", res.data);
      navigate("/rekapitulasi", {
        state: { successMessage: "Produk berhasil ditambahkan!" },
      });
    } catch (err) {
      console.error("Gagal mengirim data:", err);
    }

    console.log("FormData yang dikirim:", {
      invoice_number: invoiceNumber,
      jenis_product: jenisProduk,
      tanggal_masuk: tanggalMasuk,
      dokumen: pdfFile?.name,
    });
  };

  return (
    <div className="space-y-4 mx-4 my-20">
      <div>
        <h1 className="font-bold text-4xl">Tambah Produk</h1>
      </div>

      <div className="bg-white border border-[#2f5597] p-4 shadow border-l-40">
        <h1 className="text-xl font-bold">Informasi</h1>
        <p>
          Di halaman ini Anda dapat menambahkan produk yang ingin mulai
          dilakukan autentikasi. Silahkan isi dengan lengkap formulir berikut!
        </p>
      </div>

      <div className="bg-white border border-[#2f5597] shadow-lg">
        <div className="container w-full md:w-1/4">
          <div className="m-2 font-semibold space-y-4">
            {isSubmited && !validate() && (
              <p className="text-red-500">Isilah dengan Benar!</p>
            )}
            <div className="flex gap-4 items-center">
              <div className="space-y-2 w-full">
                <p>Invoice Number :</p>
                <input
                  className="border-2 p-2 rounded-lg w-full  bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2f5597] shadow-sm transition duration-300"
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2 w-full">
                <p>Jenis Produk :</p>

                <select
                  className="border-2 p-2.5 rounded-lg w-full leading-tight  bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2f5597] shadow-sm transition duration-300"
                  value={jenisProduk}
                  onChange={(e) => setJenisProduk(e.target.value)}
                >
                  {jenisProdukList.map((jenis, idx) => (
                    <option key={idx} value={jenis}>
                      {jenis}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Tambahkan field upload PDF */}
            <div className="flex">
              <div className="space-y-2 w-full">
                <p>Upload Dokumen PDF :</p>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                  className="border-2 p-2 rounded-lg w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2f5597] shadow-sm transition duration-300"
                />
              </div>
            </div>
            <div className="flex">
              <div className="space-y-2 w-full">
                <p>Tanggal Masuk (Input Data) :</p>
                <input
                  className="border-2 p-2 rounded-lg w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2f5597] shadow-sm transition duration-300"
                  type="date"
                  value={tanggalMasuk}
                  onChange={(e) => setTanggalMasuk(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4 justify-center mt-8">
              <button className="bg-red-500 rounded-md p-2 text-white shadow-lg hover:bg-red-600 transition duration-300">
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[#2f5597] rounded-md p-2 text-white shadow-lg hover:bg-[#2f3697] transition duration-300"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tambah_Produk;
