import React, { useState } from "react";

const Projects = () => {
  // Projects with Categories
  const projects = [
    {
      title: "International Journal of Multidisciplinary Research and Explorer",
      description:
        "The International Journal of Multidisciplinary Research and Explorer (IJMRE) is an esteemed international peer-reviewed article journal published 4 times a year. Its primary objective is to provide authentic and reliable contributions to the field of research. With a strong editorial board composed of experts in various fields, IJMRE ensures a high-quality and fast review process.",
      link: "https://ijmre.com/index.php/IJMRE",
      image: "https://academicsachievers.in/public/img/ijmre.png",
      category: "Research Journals",
    },
    {
      title: "Journal of Recent Innovations in Computer Science and Technology",
      description:
        "Journal of Recent Innovations in Computer Science and Technology(JRICST) is a scholarly peer-reviewed journal published Quarterly, four (4) Times a year, focusing on theories, methods, and applications in Computer Science and innovation in Technology. It provides a challenging forum for researchers, industrial professionals, engineers, managers, and policymakers working in the field to contribute and disseminate innovative new work on Computer Science and innovation in Technology.",
      link: "https://jricst.com/index.php/JRICST",
      image: "https://academicsachievers.in/public/img/jricst.png",
      category: "Research Journals",
    },
    {
      title: "Digital Object Identifier (DOI) Engine",
      description:
        "A Digital Object Identifier (DOI) Engine is a doi registration agency which provides a serial code that uniquely identifies objects. Particularly for electronic publications like journal articles, the DOI Engine system is employed. In 2020, the DOI Engine system was introduced and this system does not belong to any other doi provider in any form. The DOI Engine name is recorded alongside object-specific metadata. It might also contain the location of the thing, like a URL. As they maintain the journals, published papers, books, and other available educational resources, digital online and virtual libraries are the repository of knowledge.",
      link: "https://doie.org/",
      image: "https://academicsachievers.in/public/img/doi_provider.png",
      category: "Doi Provider",
    },
  ];

  {
    /* Category */
  }
  const categories = ["All", "Research Journals", "Doi Provider"];

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter projects by category
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-6 pt-6 pb-12">
      <h2 className="text-4xl font-bold text-center mb-6">Our Projects</h2>

      {/* Category Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-10">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          No projects available in this category.
        </p>
      )}
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortText = project.description.slice(0, 160) + "...";

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition duration-300">
      {/* Project Image */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-64 object-cover"
      />

      {/* Project Info */}
      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>

        <p className="text-gray-600 text-base leading-relaxed mb-4">
          {isExpanded ? project.description : shortText}
        </p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:underline mb-6"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>

        <div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Visit Project →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
