import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', price: 120 },
  { name: 'Feb', price: 135 },
  { name: 'Mar', price: 150 },
  { name: 'Apr', price: 145 },
  { name: 'May', price: 160 },
  { name: 'Jun', price: 170 },
  { name: 'Jul', price: 165 },
  { name: 'Aug', price: 175 },
  { name: 'Sep', price: 180 },
  { name: 'Oct', price: 190 },
  { name: 'Nov', price: 195 },
  { name: 'Dec', price: 200 },
];

const companyLink = "https://example.com/company-stock";

const GraphCompany = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Company Stock Price Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <a 
          href={companyLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline"
        >
          View More Details
        </a>
      </div>
    </div>
  );
};

export default GraphCompany;