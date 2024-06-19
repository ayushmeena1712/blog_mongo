import React from 'react';

function Footer() {
  const footerItem = [
    {
      name: 'Home',
      link: '/'
    },
    {
      name: 'About',
      link: '/about'
    },
    {
      name: 'Contact',
      link: '/contact'
    }
  ];

  return (
    <div className="w-full bg-black text-white py-6 rounded-lg">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">Logo</div>
        
        {/* Footer Links */}
        <div className="mt-4 md:mt-0">
          <ul className="flex gap-6">
            {footerItem.map(item => (
              <li key={item.name}>
                <a href={item.link} className="hover:text-gray-400 transition duration-300">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* GitHub Link */}
        <div className="mt-4 md:mt-0">
          <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition duration-300">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.165c-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.746.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.836 2.807 1.306 3.492.998.107-.775.418-1.306.762-1.606-2.665-.3-5.467-1.333-5.467-5.93 0-1.31.468-2.382 1.235-3.222-.124-.302-.535-1.517.117-3.165 0 0 1.008-.322 3.301 1.23a11.513 11.513 0 013.006-.405c1.02.005 2.044.138 3.005.405 2.29-1.552 3.297-1.23 3.297-1.23.654 1.648.243 2.863.12 3.165.77.84 1.234 1.912 1.234 3.222 0 4.61-2.807 5.625-5.478 5.92.429.37.813 1.103.813 2.222v3.293c0 .32.218.694.825.575C20.565 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
      
      {/* Copyright Notice */}
      <div className="container mx-auto px-4 text-center mt-4 md:mt-0">
        <p className="mt-4">&copy; 2024 Blog Application. All rights reserved.</p>
      </div> 
    </div>
  );
}

export default Footer;
