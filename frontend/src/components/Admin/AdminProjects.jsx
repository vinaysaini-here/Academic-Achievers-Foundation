import React, { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaTimes,
  FaFolderPlus,
  FaExternalLinkAlt,
} from "react-icons/fa";

const AdminProjects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "International Journal of Multidisciplinary Research and Explorer",
      category: "Research Journals",
      description:
        "The International Journal of Multidisciplinary Research and Explorer (IJMRE) is an esteemed international peer-reviewed article journal published 4 times a year. Its primary objective is to provide authentic and reliable contributions to the field of research. With a strong editorial board composed of experts in various fields, IJMRE ensures a high-quality and fast review process.",
      link: "https://ijmre.com/index.php/IJMRE",
      image: "https://academicsachievers.in/public/img/ijmre.png",
    },
    {
      id: 2,
      name: "Journal of Recent Innovations in Computer Science and Technology",
      category: "Research Journals",
      description:
        "Journal of Recent Innovations in Computer Science and Technology(JRICST) is a scholarly peer-reviewed journal published Quarterly, four (4) Times a year, focusing on theories, methods, and applications in Computer Science and innovation in Technology. It provides a challenging forum for researchers, industrial professionals, engineers, managers, and policymakers working in the field to contribute and disseminate innovative new work on Computer Science and innovation in Technology.",
      link: "https://jricst.com/index.php/JRICST",
      image: "https://academicsachievers.in/public/img/jricst.png",
    },
    {
      id: 3,
      name: "Digital Object Identifier (DOI) Engine",
      category: "Doi Provider",
      description:
        "A Digital Object Identifier (DOI) Engine is a doi registration agency which provides a serial code that uniquely identifies objects. Particularly for electronic publications like journal articles, the DOI Engine system is employed. In 2020, the DOI Engine system was introduced and this system does not belong to any other doi provider in any form. The DOI Engine name is recorded alongside object-specific metadata. It might also contain the location of the thing, like a URL. As they maintain the journals, published papers, books, and other available educational resources, digital online and virtual libraries are the repository of knowledge.",
      link: "https://doie.org/",
      image: "https://academicsachievers.in/public/img/doi_provider.png",
    },
  ]);

  const [categories, setCategories] = useState([
    "Research Journals",
    "Doi Provider",
  ]);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [newProject, setNewProject] = useState({
    name: "",
    category: "",
    description: "",
    image: null,
    link: "",
  });

  const [newCategory, setNewCategory] = useState("");

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProject({ ...newProject, image: URL.createObjectURL(file) });
    }
  };

  // Add new project
  const handleAddProject = (e) => {
    e.preventDefault();
    if (
      !newProject.name ||
      !newProject.description ||
      !newProject.image ||
      !newProject.category ||
      !newProject.link
    ) {
      alert("Please fill all fields!");
      return;
    }
    const newEntry = {
      ...newProject,
      id: Date.now(),
    };
    setProjects([...projects, newEntry]);
    setShowProjectModal(false);
    setNewProject({
      name: "",
      category: "",
      description: "",
      image: null,
      link: "",
    });
  };

  // Delete project
  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  // Add new category
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      alert("Please enter a category name!");
      return;
    }
    if (categories.includes(newCategory)) {
      alert("Category already exists!");
      return;
    }
    setCategories([...categories, newCategory]);
    setNewCategory("");
    setShowCategoryModal(false);
  };

  // Delete category
  const handleDeleteCategory = (cat) => {
    if (
      window.confirm(`Delete category "${cat}"? This may affect some projects.`)
    ) {
      setCategories(categories.filter((c) => c !== cat));
      setProjects(
        projects.map((p) => (p.category === cat ? { ...p, category: "" } : p))
      );
    }
  };

  return (
    <div className="min-h-[78vh]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Manage Projects</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCategoryModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
          >
            <FaFolderPlus /> Add Category
          </button>
          <button
            onClick={() => setShowProjectModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700"
          >
            <FaPlus /> Add Project
          </button>
        </div>
      </div>

      {/* Project List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col"
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-3 text-lg font-semibold">{project.name}</h3>
            <p className="text-sm text-gray-500">{project.category}</p>
            <p className="text-gray-600 mt-2 line-clamp-3">
              {project.description}
            </p>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 mt-2 flex items-center gap-1"
              >
                <FaExternalLinkAlt /> Visit Project
              </a>
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] md:w-[500px] shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
              onClick={() => setShowProjectModal(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Project</h2>
            <form className="space-y-4" onSubmit={handleAddProject}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                  className="border rounded w-full p-2"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  value={newProject.category}
                  onChange={(e) =>
                    setNewProject({ ...newProject, category: e.target.value })
                  }
                  className="border rounded w-full p-2"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  className="border rounded w-full p-2"
                  rows="3"
                  placeholder="Write about the project..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Project Link
                </label>
                <input
                  type="url"
                  value={newProject.link}
                  onChange={(e) =>
                    setNewProject({ ...newProject, link: e.target.value })
                  }
                  className="border rounded w-full p-2"
                  placeholder="https://example.com/project"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border rounded w-full p-2"
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full"
              >
                Save Project
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] md:w-[400px] shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
              onClick={() => setShowCategoryModal(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-4">Manage Categories</h2>

            {/* Add Category Form */}
            <form className="flex gap-2 mb-4" onSubmit={handleAddCategory}>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
                className="border rounded w-full p-2"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-3 rounded-md hover:bg-blue-700"
              >
                <FaPlus />
              </button>
            </form>

            {/* Category List */}
            <ul className="space-y-2">
              {categories.map((cat, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
                >
                  <span>{cat}</span>
                  <button
                    onClick={() => handleDeleteCategory(cat)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
