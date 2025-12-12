import React from "react";
import assets from "../../assets/assets";

const ReasonForHelp = () => {
  const reasons = [
    {
      img: assets.RfH_Img_1,
      title: "Inspiration for Future Generations",
      desc: "Supporting education and research ensures that future generations continue to explore, innovate, and solve complex problems.",
    },
    {
      img: assets.RfH_Img_2,
      title: "Grants & Government Funding",
      desc: "Apply for educational and research grants from governments or international organizations.",
    },
    {
      img: assets.RfH_Img_3,
      title: "Promoting Education",
      desc: "Providing scholarships, grants, or financial assistance to deserving students.",
    },
  ];
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Reason for Helping
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          NGOs exist to serve communities by addressing poverty, education gaps,
          health issues, women empowerment, child rights, etc.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img
              src={reason.img}
              alt={reason.title}
              className="w-full h-64 object-cover rounded-3xl shadow-md"
            />
            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              {reason.title}
            </h3>
            <p className="mt-3 text-gray-600 text-sm sm:text-base">
              {reason.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReasonForHelp;
