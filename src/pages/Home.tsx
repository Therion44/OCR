import PostAddIcon from "@mui/icons-material/PostAdd";
import FindInPageTwoToneIcon from "@mui/icons-material/FindInPageTwoTone";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="space-y-4 mx-4 my-20">
      <div>
        <h1 className="font-bold text-4xl">Home Page</h1>
      </div>

      <div className="bg-white border border-[#2f5597] p-4 shadow border-l-40">
        <h1 className="text-xl font-bold">
          Selamat datang, Petugas 1 Administrasi
        </h1>
        <p>Silahkan pilih kegiatan yang akan Anda lakukan di sistem</p>
      </div>

      <div className="bg-white border border-[#2f5597] shadow-lg">
        <div className="flex flex-wrap justify-center gap-8 p-6">
          <Link to="/rekapitulasi">
            <div className="w-full sm:w-[400px] md:w-[500px] bg-[#4472c4] flex flex-col items-center p-8 rounded-xl shadow-xl">
              <PostAddIcon sx={{ fontSize: 140 }} className="text-white" />
              <div className="text-center text-white text-2xl mt-6">
                Saya ingin menambahkan produk baru yang perlu diautentikasi
              </div>
            </div>
          </Link>

          <div className="w-full sm:w-[400px] md:w-[500px] bg-[#4472c4] flex flex-col items-center p-8 rounded-xl shadow-xl">
            <FindInPageTwoToneIcon
              sx={{ fontSize: 140 }}
              className="text-white"
            />
            <div className="text-center text-white text-2xl mt-6">
              Saya ingin melakukan autentikasi administratif
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
