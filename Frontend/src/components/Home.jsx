import React, { useState, useEffect } from 'react';

function Home() {
  const getRandomDirection = () => Math.random() > 0.5 ? 1 : -1;

  const [colors, setColors] = useState({
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
    dr: getRandomDirection(),
    dg: getRandomDirection(),
    db: getRandomDirection(),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColors(prev => {
        const newR = Math.min(255, Math.max(0, prev.r + prev.dr));
        const newG = Math.min(255, Math.max(0, prev.g + prev.dg));
        const newB = Math.min(255, Math.max(0, prev.b + prev.db));
 
        const newDr = newR === 255 || newR === 0 ? -prev.dr : prev.dr;
        const newDg = newG === 255 || newG === 0 ? -prev.dg : prev.dg;
        const newDb = newB === 255 || newB === 0 ? -prev.db : prev.db;

        return {
          r: newR,
          g: newG,
          b: newB,
          dr: newDr,
          dg: newDg,
          db: newDb,
        };
      });
    }, 20); 

    return () => clearInterval(intervalId);
  }, []);

  const gradientStyle = {
    backgroundImage: `linear-gradient(45deg, rgb(${colors.r}, ${colors.g}, ${colors.b}), rgb(${colors.b}, ${colors.r}, ${colors.g}), rgb(${colors.g}, ${colors.b}, ${colors.r}))`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
    transition: 'background-image 0.5s linear',
  };

  return (
    <div className='h-full w-full'>
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 py-3" style={gradientStyle}>
            Welcome to Our Blog Application
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Discover insightful articles on a wide range of topics including technology, health, finance, and more.
          </p>
          <button className="bg-[#6B8A7A] text-white py-2 px-4 rounded-full text-lg">
            Explore Blogs
          </button>
        </div>
      </section>
 
      <section className="text-[#944454] py-12">
        <div className=" container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/30  rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Quality Content</h3>
              <p className="text-gray-700">Our articles are written by experts in their fields, ensuring you get the best information available.</p>
            </div>
            <div className="p-6 bg-white/30  rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Diverse Topics</h3>
              <p className="text-gray-700">From technology to health and finance, we cover a wide range of topics to keep you informed.</p>
            </div>
            <div className="p-6 bg-white/30  rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Regular Updates</h3>
              <p className="text-gray-700">We regularly update our blog with new articles to ensure you always have something new to read.</p>
            </div>
          </div>
        </div>
      </section>
 
 
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-[#944454] text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="text-lg text-gray-700 mb-4">Have any questions or feedback? We'd love to hear from you!</p>
          <button className="bg-[#6B8A7A] text-white py-2 px-4 rounded-full text-lg">Contact Us</button>
        </div>
      </section>
    </div>
  );
}

export default Home;
