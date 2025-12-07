import React from "react";
import { Copy } from "lucide-react";
import { TABLE_COLUMNS } from "../utils/constants";
import { formatCurrency, formatPhoneNumber, removeHyphens } from "../utils/helpers";

const TransactionTable = ({ data = [], loading = false }) => {
  if (loading)
    return (
      <div className="bg-white rounded p-8 text-center text-gray-900 font-medium">
        Loading...
      </div>
    );

  if (!data.length)
    return (
      <div className="bg-white rounded p-8 text-center text-gray-900 font-medium">
        No results found
      </div>
    );

  return (
    <div className="bg-white ml-6 mr-6 overflow-auto">
      <table className="w-full" style={{ minWidth: "1200px" }}>
        <thead className="bg-[#f4f5f7] text-gray-950">
          <tr>
            {TABLE_COLUMNS.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-normal tracking-wide"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => {
            const isLast = idx === data.length - 1;
            const borderClass = isLast ? "" : "border-b border-gray-200";

            return (
              <tr key={idx} className="hover:bg-gray-100 transition">
                <td className="px-4 py-3 text-xs text-black font-light">
                  {row["Transaction ID"]}
                </td>

                <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap font-light">
                  {row.Date}
                </td>

                <td className={`px-4 py-3 text-xs text-black font-regular ${borderClass}`}>
                  {removeHyphens(row["Customer ID"])}
                </td>

                <td className={`px-4 py-3 text-xs text-black font-lightbold ${borderClass}`}>
                  {row["Customer Name"]}
                </td>

                <td className={`px-4 py-3 text-xs text-gray-900 whitespace-nowrap font-light ${borderClass}`}>
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    {formatPhoneNumber(row["Phone Number"])}
                    <button
                      onClick={() => navigator.clipboard.writeText(row["Phone Number"])}
                      className="p-1 hover:bg-gray-300 rounded"
                    >
                      <Copy className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </td>

                <td className={`px-4 py-3 text-xs text-gray-900 ${borderClass}`}>
                  {row.Gender}
                </td>

                <td className={`px-4 py-3 text-xs text-gray-900 ${borderClass}`}>
                  {row.Age}
                </td>

                <td className={`px-4 py-3 text-xs text-gray-900 font-medium whitespace-nowrap ${borderClass}`}>
                  {row["Product Category"]}
                </td>

                <td className={`px-4 py-3 text-xs text-black font-semibold ${borderClass}`}>
                  {row.Quantity}
                </td>

                <td className={`px-4 py-3 text-xs text-black font-semibold ${borderClass}`}>
                  {formatCurrency(row["Total Amount"])}
                </td>

                <td className={`px-4 py-3 text-xs text-gray-900 font-semibold ${borderClass}`}>
                  {row["Customer Region"]}
                </td>

                <td className={`px-4 py-3 text-xs text-black font-semibold ${borderClass}`}>
                  {removeHyphens(row["Product ID"])}
                </td>

                <td className={`px-4 py-3 text-xs text-gray-900 font-semibold whitespace-nowrap ${borderClass}`}>
                  {row["Employee Name"]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
