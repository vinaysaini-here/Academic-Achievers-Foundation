import React, { useEffect, useState } from "react";
import { FaEye, FaFilePdf } from "react-icons/fa";
import { useDocumentStore } from "../store/useDocumentStore";

const Documents = () => {
  const BACKEND_URL = import.meta.env.VITE_API_URL; 
  const { documents, isFetching, getAllDocuments } = useDocumentStore();
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Fetch documents on mount
  useEffect(() => {
    getAllDocuments();
  }, [getAllDocuments]);

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FaFilePdf className="text-red-500 text-3xl" />;
      default:
        return <FaFilePdf className="text-red-600 text-3xl" />;
    }
  };

  // Build full URL for the PDF file
  const getFullFileUrl = (fileUrl) => `${BACKEND_URL}${fileUrl}`;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:pb-10">
      {/* Header */}
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          NGO Licenses & Certificates
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Transparency is our priority. Below are the official licenses and
          certificates of AAEAR Foundation that validate our work and compliance.
        </p>
      </section>

      {/* Loader */}
      {isFetching && (
        <p className="text-center text-gray-500">Loading documents...</p>
      )}

      {/* Document Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {documents.map((doc) => (
          <div
            key={doc._id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 mb-4">
              {getFileIcon(doc.type)}
              <h2 className="text-lg font-semibold text-gray-800">{doc.title}</h2>
            </div>
            <p className="text-gray-600 text-sm flex-1">{doc.description}</p>

            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={() => setSelectedDoc(doc)}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <FaEye /> View
              </button>
            </div>
          </div>
        ))}
      </div>

      {!isFetching && documents.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          No documents available at the moment. Please check back later.
        </p>
      )}

      {/* Modal for PDF preview */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[70%] h-[80%] rounded-lg shadow-lg overflow-hidden relative">
            <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
              <h2 className="text-lg font-semibold">{selectedDoc.title}</h2>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-red-600 font-bold text-lg"
              >
                ✖
              </button>
            </div>

            <embed
              src={getFullFileUrl(selectedDoc.fileUrl) + "#toolbar=0&navpanes=0&scrollbar=0"}
              type="application/pdf"
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
