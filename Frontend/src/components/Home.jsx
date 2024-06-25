import React, { useState, useEffect } from 'react';

function Home() {
  const generateRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  };

  const [colors, setColors] = useState({
    color1: generateRandomColor(),
    color2: generateRandomColor(),
    color3: generateRandomColor(),
  });

  useEffect(() => { 
    const changeGradient = () => {
      setColors({
        color1: generateRandomColor(),
        color2: generateRandomColor(),
        color3: generateRandomColor(),
      });
    };
    const intervalId = setInterval(changeGradient, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const gradientStyle = {
    backgroundImage: `linear-gradient(45deg, ${colors.color1}, ${colors.color2}, ${colors.color3})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
    transition: 'background 3s ease-in-out'
  };

  return (
    <div className='h-full w-full'> 
      <section className="  py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 py-3" style={gradientStyle}>Welcome to Our Blog Application</h1>
          <p className="text-lg text-gray-700 mb-6">Discover insightful articles on a wide range of topics including technology, health, finance, and more.</p>
          <button className="bg-[#6B8A7A] text-white py-2 px-4 rounded-full text-lg">Explore Blogs</button>
        </div>
      </section>
 
      <section className=" 0 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-[#944454] text-3xl font-bold mb-8">About Us</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">Our blog is dedicated to providing readers with insightful articles on a wide range of topics including technology, health, finance, and more. Our team of experienced writers ensures that each post is informative, engaging, and up-to-date with the latest trends and information.</p>
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
