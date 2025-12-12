import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";


export const useDocumentStore = create((set , get) => ({
  documents: [],
  isFetching: false,
  isUploading:false,


  getAllDocuments: async () => {
    set({ isFetching: true });
    try {
      const res = await axiosInstance.get("/api/document/documents");
      set({ documents: res.data.documents, isFetching: false });
    } catch (error) {
      console.error("Error Fetching Documents", error);
      toast.error("Failed to fetch documents");
      set({ isFetching: false });
    }
  },

   // Delete a document
   deleteDocument: async (id) => {
    try {
      await axiosInstance.delete(`/api/document/documents/${id}`);
      set({ documents: get().documents.filter((doc) => doc._id !== id) });
      toast.success("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document");
    }
  },

  addDocument: async(data) =>{
    set({isUploading:true})
    try {
      const res = await axiosInstance.post("/api/document/document",data);
      toast.success("Document Uploaded Successfully")
      // console.log(res.data);
      
    } catch (error) {
      toast.error( "Uploading Failed.. Please try again later")
      console.log("Error : ", error);
      // console.log(res.data);
      
      
    }finally{
      set({isUploading:false})
    }
  },

}));
