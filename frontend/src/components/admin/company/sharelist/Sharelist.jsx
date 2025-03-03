import React from 'react';

const sharePlatforms = [
  { name: 'Zerodha', url: 'https://zerodha.com' },
  { name: 'Groww', url: 'https://groww.in' },
  { name: 'Kotak', url: 'https://www.kotaksecurities.com' },
  { name: 'HDFC', url: 'https://www.hdfcsec.com' },
  { name: 'Upstox', url: 'https://upstox.com' },
  { name: 'Binomo', url: 'https://binomo.com' }
];

const Sharelist = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Stock Trading Platforms</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sharePlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border rounded-lg shadow hover:shadow-lg transition"
          >
            <p className="text-center font-semibold">{platform.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sharelist;
