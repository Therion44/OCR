import { useState, useRef, useEffect, type ChangeEvent } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import Ocr from "../component/Ocr"
import TabelOCR from "../component/tabel_ocr"

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

function Detail_Autentikasi() {
  //   const [inputID, setInputID] = useState("");
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [numPages, setNumPages] = useState<number>(1);
  const [numPagesUploaded, setNumPagesUploaded] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageNumberUploaded, setPageNumberUploaded] = useState<number>(1);
  const [uploadedPdf, setUploadedPdf] = useState<string | null>(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [canvasBlob, setCanvasBlob] = useState<Blob | null>(null);

  //   const [pdfWidth, setPdfWidth] = useState(500);
  //   const [hasilOCR, setHasilOCR] = useState("");
  //   const [lagiScan, setLagiScan] = useState(false);
  //   const [mulaiScan, setMulaiScan] = useState(false);
  //   const [shipper, setShipper] = useState("");
  //   const [buyer, setBuyer] = useState("");
  //   const [invoice, setInvoice] = useState("");

  const [pdfWidth, setPdfWidth] = useState<number>();
  const [pdfWidthUpload, setPdfWidthUpload] = useState<number>();
 

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const fileURL = URL.createObjectURL(file); // Ini kuncinya
      setUploadedPdf(fileURL);
    }
  };

  

  useEffect(() => {
  function updateWidth() {
    if (canvasContainerRef.current) {
      setPdfWidth(canvasContainerRef.current * 0.95);
    }
    if (canvasUploadRef.current) {
      setPdfWidthUpload(canvasUploadRef.current* 0.95);
    }
  }

  updateWidth();
  window.addEventListener("resize", updateWidth);
  return () => window.removeEventListener("resize", updateWidth);
}, []);


  const canvasContainerRef = useRef(null);
  const canvasUploadRef = useRef(null)

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:1212/api/products/6884e6130463be1c4eb52b84/file`,
        { responseType: "blob" }
      );
      setPdfBlob(res.data);
     
    } catch (error) {
      console.error("Gagal ambil PDF:", error);
    }
  };

  const onDocumentLoadSuccess = (document: any ) => {
    setNumPages(document.numPages);
  };

  const onDocumentUploadSuccess = (document: any) => {
    setNumPagesUploaded(document.numPages);
  };

 const onPageRenderSuccess = async () => {
  const canvas = canvasContainerRef.current
  const ctx = canvas.querySelector("canvas");
  const canvas2 = canvasUploadRef.current;
  

  if (canvas) {
    setPdfWidth(canvas.offsetWidth * 0.95);
    ctx.toBlob(function(blob){  
    setCanvasBlob(blob)
  },'image/png');
  
  }

  if (canvas2) {
    setPdfWidthUpload(canvas.offsetWidth * 0.95);
  }
};


  const nextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  const nextPageUploaded = () => {
    if (pageNumberUploaded < numPagesUploaded)
      setPageNumberUploaded(pageNumberUploaded + 1);
  };

  const prevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const prevPageUploaded = () => {
    if (pageNumberUploaded > 1) setPageNumberUploaded(pageNumberUploaded - 1);
  };

  return (
    <div className="space-y-4 mx-4 my-20">
      <div>
        <h1 className="font-bold text-4xl">Detail Autentikasi Administratif</h1>
      </div>

      <div className="bg-white border border-[#2f5597] p-4 shadow border-l-40 text-xl">
        <p className=" text-lg">
          Detail autentikasi administratif produk yang dipilih ditampilkan pada
          halaman ini
        </p>
      </div>

      <div className="bg-white border border-[#2f5597] shadow-lg text-xl">
        <div className="p-4 ">
          <div className="w-full border-b-gray-300 border-b-2">
            <p className="">Invoice Number : 1009866</p>
          </div>

          {/* Card utama pembungkus keduanya */}

          <div className="flex md:flex-row flex-col justify-between">
            {/* Card 1 bagian kiri/atas untuk get Data yang sudah tersimpan */}
            <div className="flex flex-col md:w-1/2 gap-4 md:border-r-2 border-gray-400">
              <p>Tanggal Masuk : Senin, 12 Mei 2025</p>
              <p>
                Status Autentikasi :{" "}
                <span className="bg-gray-500 rounded-sm p-1.5 text-white font-semibold shadow-lg">
                  Belum Dilakukan
                </span>
              </p>
              <p>
                Dokumen Softfile Tersimpan :
                <span
                  onClick={getData}
                  className="ml-2 bg-yellow-400 p-2 rounded-sm font-semibold shadow-lg cursor-pointer "
                >
                  Get Document
                </span>
              </p>

              {/* ini adalah card khusus menampilkan pdf */}

              {pdfBlob && (
                <div ref={canvasContainerRef} className="flex flex-col  content-center items-center bg-neutral-800 p-6 m-2 shadow-inner ">
                  <div className="m-2 overflow-y-scroll" style={{ width: pdfWidth, height: pdfWidth * 0.75 }}>
                    <div className="mt-6 w-0">
                      <div>
                        <Document
                          file={pdfBlob}
                          onLoadSuccess={onDocumentLoadSuccess}
                          loading="Memuat PDF..."
                        >
                          <Page
                            pageNumber={pageNumber}
                            onRenderSuccess={onPageRenderSuccess}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            width={pdfWidth}
                            height={10}
                            className="border-1 border-gray-600 shadow-l hover:shadow-xl transition-shadow duration-200 ease-in-out rounded-l"
                          />
                        </Document>
                      </div>

                    </div>
                  </div>
                      {/* Tombol navigasi, ngikutin ukuran canvas */}
                    <div
                        className="flex justify-between items-center mt-4 bg-[#2f5597] px-2 py-2 border rounded"
                        style={{ width: pdfWidth }}
                      >
                        <button
                          onClick={prevPage}
                          disabled={pageNumber <= 1}
                          className="bg-yellow-400 text-white px-0 py-0 md:px-3 md:py-1 m-2 rounded hover:bg-yellow-600 disabled:opacity-50"
                        >
                          ← Sebelumnya
                        </button>
                        <span className="text-white font-medium">
                          Halaman {pageNumber} dari {numPages}
                        </span>
                        <button
                          onClick={nextPage}
                          disabled={pageNumber >= numPages}
                          className="bg-yellow-400 text-white  px-0 py-0 md:px-3 md:py-1 m-2 rounded hover:bg-yellow-600 disabled:opacity-50"
                        >
                          Selanjutnya →
                        </button>
                    </div>
                </div>
              )}

              <Ocr canvasBlob={canvasBlob} setResult={setResult} setLoading={setLoading} />

              {loading && <p className="text-yellow-300">Memproses OCR...</p>}

              {result && (
                <TabelOCR result={result} />
              )}
            </div>

            {/* Card 2 bagian kanan/bawah untuk upload */}

            <div className="flex flex-col md:w-1/2 gap-2.5 mx-1">
              <p>
                Autentikasi administratif dilakukan dengan mengunggah hasil scan
                dokumen fisik untuk dicocokkan dokumen softfile yang sudah
                tersimpan. Harap Tekan{" "}
                <span className="font-semibold">Get Document</span> terlebih
                dahulu sebelum mulai mengunggah hasil scan fisik.
              </p>

              <p className="font-semibold">Dokumen Fisik</p>
              <div className=" bg-white rounded flex flex-col items-center">

              
                {/* Card 2 bagian kanan/bawah untuk upload */}
               

                {uploadedPdf && (
                  <div ref={canvasUploadRef} className="flex flex-col content-center items-center bg-neutral-800 md:p-6 md:px-3 md:m-2 shadow-inner "> 
                    <div className="m-2 overflow-y-scroll" style={{ width: pdfWidthUpload, height: pdfWidthUpload * 0.75 }}>
                      <div className="mt-6 w-0">
                        <div ref={canvasUploadRef}>
                          <Document
                            file={uploadedPdf}
                            onLoadSuccess={onDocumentUploadSuccess}
                            loading="Memuat PDF..."
                          >
                            <Page
                              pageNumber={pageNumberUploaded}
                              onRenderSuccess={onPageRenderSuccess}
                              renderTextLayer={false}
                              renderAnnotationLayer={false}
                              width={pdfWidthUpload}
                              className="border-1 border-gray-600 shadow-l hover:shadow-xl transition-shadow duration-200 ease-in-out rounded-l"
                            />
                          </Document>
                        </div>

                        </div>
                      </div>
                        {/* Tombol navigasi, ngikutin ukuran canvas */}
                        <div
                          className="flex justify-between items-center mt-4 bg-[#2f5597] px-2 py-2 border rounded"
                          style={{ width: pdfWidth }}
                        >
                          <button
                            onClick={prevPageUploaded}
                            disabled={pageNumberUploaded <= 1}
                            className="bg-yellow-400 text-white px-0 py-0 md:px-3 md:py-1 m-2 rounded hover:bg-yellow-600 disabled:opacity-50"
                          >
                            ← Sebelumnya
                          </button>
                          <span className="text-white font-medium">
                            Halaman {pageNumberUploaded} dari {numPagesUploaded}
                          </span>
                          <button
                            onClick={nextPageUploaded}
                            disabled={pageNumberUploaded >= numPagesUploaded}
                            className="bg-yellow-400 text-white  px-0 py-0 md:px-3 md:py-1 m-2 rounded hover:bg-yellow-600 disabled:opacity-50"
                          >
                            Selanjutnya →
                          </button>
                    </div>
                  </div>
                )}

                 <div className="mb-4 flex items-center space-x-2 mt-4">
                  <span className="text-gray-600 border-2 p-1.5 border-r-0 mx-0">
                    Klik untuk mengunggah file PDF
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    id="pdf-upload"
                    className="hidden"
                  />
                  <label
                    htmlFor="pdf-upload"
                    className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
                  >
                    {uploadedPdf ? "Ganti Berkas..." : "Pilih Berkas..."}
                  </label>
                </div>
              </div>

              <div className="w-full flex justify-center mt-4">
                <div className="bg-gray-400 w-fit px-2 p-2 rounded-sm font-semibold cursor-pointer">
                  Match Data
                </div>
              </div>
            </div>
          </div>

          <div>
            <button className="bg-gray-500 rounded-sm text-white text-lg font-bold p-2 shadow-lg">
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail_Autentikasi;
