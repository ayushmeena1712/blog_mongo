import React from 'react';

function About() {
	const technologies = [
		{ name: 'Node.js' },
		{ name: 'React.js' },
		{ name: 'React Router DOM'},
		{ name: 'Redux'},
		{ name: 'React Hook Form'},
		{ name: 'Cookies'}, 
		{ name: 'JWT authentication'},
		{ name: "Node Mailer"},
		{ name: "TailwindCSS"},
		{ name: "Vite"},
		{ name: "Github"}
	    ];
  return (
    <div className="flex flex-col gap-4 mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1  
	  className="text-4xl font-bold text-[#254336] mb-6">About Us</h1>
        <div className="mb-8">
          <p className='text-2xl text-[#575650] py-10'>I am, <span className="text-3xl font-bold text-[#c57e1a]">Rashi Gupta</span></p>
	    <p className="mx-50 text-lg leading-relaxed text-pretty text-[#4e4d44] mb-8">
            I have a keen interest in constantly learning and keeping up-to-date with the latest advancements in technology. This drive has enabled me to build robust applications and enhance my problem-solving skills.
          </p> 
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#254336] mb-4">Project Technologies</h2>
          <ul className="list-disc pl-8 space-y-2 text-[#544343]">
            {technologies.map((tech, index) => (
              <li key={index} className={`text-lg font-serif bg-white/40 ${tech.color} py-1 px-3 mx-3 rounded-full inline-table hover:scale-110 transition duration-700`}>
                {tech.name}
              </li>
            ))}
          </ul>
        </div>  
        <div className='pt-10'>
          <h2 className="text-2xl font-bold text-[#254336] mb-4">Data Structures and Algorithms</h2>
          <p className="text-lg leading-relaxed text-gray-800 mb-4">
            My proficiency in data structures and algorithms allows me to tackle complex problems with ease.
          </p>
        </div>
        
    </div>
  );
}

export default About;
