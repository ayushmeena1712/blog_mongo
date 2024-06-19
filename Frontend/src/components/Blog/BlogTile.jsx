import React from 'react';

function BlogTile({ img, title, date , onClick, onContextMenu}) {
  
  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      className="flex flex-col justify-between h-64 bg-cover bg-center rounded-xl p-4 relative text-white shadow-lg"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="text-2xl font-bold text-justify truncate w-full mb-4 rounded text-[#254336] bg-white/15 p-1">
        {title}
      </div>
      <div className="absolute bottom-4 -right-6 transform -rotate-90 -translate-y-6 text-sm bg-[#254336] bg-opacity-75 px-2 py-1 rounded">
        {date}
      </div>
    </div>
  );
}

export default BlogTile;
