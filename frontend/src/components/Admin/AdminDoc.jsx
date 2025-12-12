import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaSearch, FaFileAlt, FaTimes } from "react-icons/fa";
import { useDocumentStore } from "../../store/useDocumentStore";

const AdminDoc = () => {
  const {
    documents,
    isFetching,
    getAllDocuments,
    deleteDocument,
    addDocument,
  } = useDocumentStore();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newDoc, setNewDoc] = useState({
    title: "",
    description: "",
    file: null,
  });

  // Fetch documents on mount
  useEffect(() => {
    getAllDocuments();
  }, [getAllDocuments]);

  // Filter by search
  const filteredDocs = documents.filter((d) =>
    d.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      await deleteDocument(id);
    }
  };

  const handleAddDocument = async (e) => {
    e.preventDefault();
    if (!newDoc.title || !newDoc.file) {
      alert("Please fill all fields and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newDoc.title);
    formData.append("description", newDoc.description);
    formData.append("file", newDoc.file);

    await addDocument(formData);
    setShowModal(false);
    setNewDoc({ title: "", description: "", file: null });
  };

  return (
    <div className="min-h-[78vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Documents</h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 pl-10 rounded w-full"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Add Document */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md text-center hover:bg-green-700 flex items-center gap-2"
          >
            <FaPlus /> Add Document
          </button>
        </div>
      </div>

      {/* Loader */}
      {isFetching ? (
        <p className="text-center text-gray-500">Loading documents...</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Document</th>
                  <th className="p-3 border">Description</th>
                  <th className="p-3 border">Type</th>
                  <th className="p-3 border">Size</th>
                  <th className="p-3 border">Uploaded At</th>
                  <th className="p-3 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((doc) => (
                  <tr key={doc._id} className="hover:bg-gray-50 border">
                    <td className="p-3 flex items-center gap-3">
                      <FaFileAlt className="text-blue-500 text-xl" />
                      {doc.title}
                    </td>
                    <td className="p-3 border text-gray-600">
                      {doc.description || "—"}
                    </td>
                    <td className="p-3 border">{doc.type || "N/A"}</td>
                    <td className="p-3 border">{doc.size || "-"}</td>
                    <td className="p-3 border">
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredDocs.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">
                      No documents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden grid gap-4">
            {filteredDocs.map((doc) => (
              <div
                key={doc._id}
                className="bg-white rounded shadow p-4 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <FaFileAlt className="text-blue-500 text-2xl" />
                  <div>
                    <p className="font-semibold">{doc.title}</p>
                    <p className="text-sm text-gray-500">
                      {doc.description || "—"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{doc.size || "-"}</span>
                  <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                </div>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            ))}
            {filteredDocs.length === 0 && (
              <p className="text-center text-gray-500">No documents found.</p>
            )}
          </div>
        </>
      )}

      {/* Add Document Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] md:w-[500px] shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
              onClick={() => setShowModal(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Document</h2>
            <form className="space-y-4" onSubmit={handleAddDocument}>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={newDoc.title}
                  onChange={(e) =>
                    setNewDoc({ ...newDoc, title: e.target.value })
                  }
                  className="border rounded w-full p-2"
                  placeholder="Enter document title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={newDoc.description}
                  onChange={(e) =>
                    setNewDoc({ ...newDoc, description: e.target.value })
                  }
                  className="border rounded w-full p-2"
                  placeholder="Enter short description"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Upload File
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setNewDoc({ ...newDoc, file: e.target.files[0] })
                  }
                  className="border rounded w-full p-2"
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDoc;
