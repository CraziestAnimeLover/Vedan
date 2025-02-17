import React from 'react';

const VPK = () => {
  return (
    <div className="w-full p-4">
     

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Sr. No.</th>
            <th className="border border-gray-300 px-4 py-2">Dosha</th>
            <th className="border border-gray-300 px-4 py-2">Foods to Eat</th>
            <th className="border border-gray-300 px-4 py-2">Foods to Avoid</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">1</td>
            <td className="border border-gray-300 px-4 py-2">Vata</td>
            <td className="border border-gray-300 px-4 py-2">
              Warm, “moist”, and soft foods (e.g., berries, bananas, peaches, cooked vegetables, oats, brown rice, lean meat, eggs, dairy)
            </td>
            <td className="border border-gray-300 px-4 py-2">
              Bitter, dried, and cold foods (e.g., raw vegetables, cold desserts, dried fruit, nuts, seeds)
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">2</td>
            <td className="border border-gray-300 px-4 py-2">Kapha</td>
            <td className="border border-gray-300 px-4 py-2">
              Spicy, acidic, and filling foods (e.g., most fruits and vegetables, whole grains, eggs, low-fat cheese, unprocessed meats, hot spices)
            </td>
            <td className="border border-gray-300 px-4 py-2">
              Heavy, “fatty” foods (e.g., fats, oils, processed foods, nuts, seeds)
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">3</td>
            <td className="border border-gray-300 px-4 py-2">Pitta</td>
            <td className="border border-gray-300 px-4 py-2">
              Light, cold, sweet, and energizing foods (e.g., fruits, non-starchy vegetables, oats, eggs)
            </td>
            <td className="border border-gray-300 px-4 py-2">
              Heavy, spicy, and sour foods (e.g., red meat, potatoes, hot spices)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VPK;
