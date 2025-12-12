import React, { useState } from "react";
import { useMemberStore } from "../store/useMemberStore";

const JoinUs = () => {

  const { becomeMember , isApplying} = useMemberStore()  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    // occupation: "",
    // message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Submitted: ", formData);
    // alert("Thank you for becoming a member! We will contact you soon.");
    // setFormData({
    //   name: "",
    //   email: "",
    //   phone: "",
    //   address: "",
    //   // occupation: "",
    //   // message: "",
    // });
    becomeMember(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#fef3c7] text-black py-16 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Join Us as a Member
        </h1>
        <p className="max-w-2xl mx-auto text-lg">
          Be a part of AAEAR Foundation and contribute to shaping the future of
          education, research, and social development.
        </p>
      </section>

      <section className="py-12 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-blue-700">
          Why Become a Member?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Make an Impact",
              desc: "Contribute towards empowering communities through education and research.",
            },
            {
              title: "Networking",
              desc: "Connect with educators, researchers, and industry leaders worldwide.",
            },
            {
              title: "Exclusive Access",
              desc: "Get access to research journals, workshops, training, and events.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-600">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Fill the Form to Become a Member
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Occupation"
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
          </div>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Your Address"
            required
            rows="3"
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Why do you want to join us?"
            rows="3"
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
          <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-white hover:text-black hover:border transition"
           disabled={isApplying}>
            {isApplying ? "Applying..." : "Become a Member"}
            
          </button>
        </form>
      </section>
    </div>
  );
};

export default JoinUs;
