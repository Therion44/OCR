import axios from "axios";

const OcrControls = ({ canvasBlob, setResult, setLoading }) => {
  const handleOCR = async () => {
    if (!canvasBlob) {
      alert("Gambar belum tersedia.");
      return;
    }

    const formData = new FormData();
    const file = new File([canvasBlob], "temp.png", {
      type: "image/png",
    });
    formData.append("image", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:1212/api/files/ocr",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResult(response.data);
      console.log(response);
    } catch (err) {
      console.error("OCR gagal:", err);
      alert("Gagal melakukan OCR.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center mt-4">
      <div
        className="bg-yellow-400 w-fit px-2 p-2 rounded-sm font-semibold cursor-pointer"
        onClick={handleOCR}
      >
        Get Data
      </div>
    </div>
  );
};

export default OcrControls;
