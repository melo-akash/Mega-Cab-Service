import React, { useState } from 'react';
import { assets, projectsData } from '../assets/assets';
import { motion } from "framer-motion";


const Projects = () => {
  // State to keep track of the current project index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the previous project
  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1));
  };

  // Function to go to the next project
  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <motion.div 
    initial={{opacity:0, x:-200}}
    transition={{duration: 1}}
    whileInView={{opacity:1, x:0}}
    viewport={{once :true}}
    
    className="container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 w-full overflow-hidden" id="Projects">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-center">
        Projects <span className="underline underline-offset-4 decoration-1 font-light">Completed</span>
      </h1>
      <p className="text-gray-500 max-w-2xl mx-auto text-center mb-8">
        Here are some of the projects I have worked on, showcasing my skills and dedication to delivering high-quality results.
      </p>

      {/* Slide button */}
      <div className="flex justify-center sm:justify-end items-center mb-8">
        <button
          className="p-3 bg-gray-200 rounded mr-2"
          aria-label="Previous Project"
          onClick={prevProject}
        >
          <img src={assets.left_arrow} alt="Previous" />
        </button>
        <button
          className="p-3 bg-gray-200 rounded mr-2"
          aria-label="Next Project"
          onClick={nextProject}
        >
          <img src={assets.right_arrow} alt="Next" />
        </button>
      </div>

      {/* Project slider container */}
      <div className="overflow-hidden">
        <div
          className="flex gap-8 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projectsData.map((project, index) => (
            <div key={index} className="relative flex-shrink-0 w-full sm:w-1/4 max-w-xs">
              <img src={project.image} alt={project.title} className="w-full h-auto mb-14" />
              <div className="absolute left-0 right-0 bottom-5 flex justify-center">
                <div className="inline-block bg-white w-3/4 px-4 py-2 shadow-md rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800">{project.title}</h2>
                  <p className="text-gray-500 text-sm">
                    {project.price} <span className='px-1'> </span> {project.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
