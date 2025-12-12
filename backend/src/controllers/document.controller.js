import Document from "../models/documentModel.js";
import path from "path";
import fs from "fs"

// -----------------------------------------------------
// Upload Document
// -----------------------------------------------------
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: "failed", message: "No file uploaded" });
    }


    const { title, description } = req.body;
    if(!title || !description){
      return res
        .status(400)
        .json({ status: "failed", message: "Title and Description are Required" });
      
    }



    const document = await Document.create({
      title,
      description,
      fileUrl: `/uploads/documents/${req.file.filename}`, 
      // key: req.file.filename, // optional unique reference
    });

    res.status(201).json({
      status: "success",
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Error uploading document" });
  }
};

// -----------------------------------------------------
// List Documents
// -----------------------------------------------------
export const listDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({ uploadedAt: -1 });
    res.status(200).json({
      status: "success",
      message: "Documents fetched successfully",
      documents,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Failed to fetch documents" });
  }
};

// -----------------------------------------------------
// Delete Document
// -----------------------------------------------------
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id);

    if (!document) {
      return res
        .status(404)
        .json({ status: "failed", message: "Document not found" });
    }

    // Remove file from server
    const filePath = path.join("src/uploads/documents", document.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove from DB
    await document.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting document:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Error deleting document" });
  }
};
