type OcrResult = {
  text: string;
  shipperName: string | null;
  buyerName: string | null;
  invoiceName: string | null;
};

type Props = {
  result: OcrResult | null;
};

const OcrResultTable: React.FC<Props> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2 text-left">Field</th>
            <th className="border px-4 py-2 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-semibold">Full OCR Text</td>
            <td className="border px-4 py-2 whitespace-pre-wrap">
              {result.text}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Shipper Name</td>
            <td className="border px-4 py-2">{result.shipperName || "-"}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Buyer Name</td>
            <td className="border px-4 py-2">{result.buyerName || "-"}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Invoice Number</td>
            <td className="border px-4 py-2">{result.invoiceName || "-"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OcrResultTable;
