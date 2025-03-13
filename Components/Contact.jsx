import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    
    const formData = new FormData(event.target);
    formData.append("access_key", "eae41f57-977b-4a55-a607-cd963cd12159");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("");
        toast.success("Form Submitted Successfully!");
        event.target.reset();
      } else {
        console.error("Error", data);
        toast.error(data.message || "Submission failed.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-center p-6 py-20 lg:px-32 w-full overflow-hidden"
      id="Contact"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2">
        Contact <span className="underline underline-offset-4 decoration-1 font-light">Us</span>
      </h1>
      <p className="text-gray-500 max-w-auto text-center mb-8">
        "We are here to assist you. Feel free to reach out!"
      </p>

      <form onSubmit={onSubmit} className="max-w-2xl mx-auto text-gray-600 pt-8">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 text-left">
            <label className="block font-medium">Your Name</label>
            <input
              className="w-full border border-gray-300 rounded py-3 px-3 mt-2 focus:ring-2 focus:ring-blue-500 outline-none"
              name="Name"
              type="text"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="w-full md:w-1/2 text-left md:pl-4">
            <label className="block font-medium">Your Email</label>
            <input
              className="w-full border border-gray-300 rounded py-3 px-3 mt-2 focus:ring-2 focus:ring-blue-500 outline-none"
              name="Email"
              type="email"
              placeholder="Your Email"
              required
            />
          </div>
        </div>

        <div className="my-6 text-left">
          <label className="block font-medium">Message</label>
          <textarea
            className="w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            name="Message"
            placeholder="Write your message here..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-12 mb-10 rounded hover:bg-blue-700 transition"
        >
          {result || "Send Message"}
        </button>
      </form>
    </motion.div>
  );
};

export default Contact;
