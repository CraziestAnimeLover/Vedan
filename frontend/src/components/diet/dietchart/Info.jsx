import React from "react";

const Info = () => {
  return (
    <div className="w-full p-4">
     

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Sr. No.</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Purpose</th>
            <th className="border border-gray-300 px-4 py-2">Source</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">1</td>
            <td className="border border-gray-300 px-4 py-2">Carbohydrates</td>
            <td className="border border-gray-300 px-4 py-2">
              Provide a steady supply of energy, which is important for concentration and focus during study sessions.
            </td>
            <td className="border border-gray-300 px-4 py-2">
              Whole grains like brown rice, oats, quinoa, whole wheat bread, and pasta.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">2</td>
            <td className="border border-gray-300 px-4 py-2">Proteins</td>
            <td className="border border-gray-300 px-4 py-2">
              Essential for muscle repair, immune function, and neurotransmitter production, which are important for cognitive function.
            </td>
            <td className="border border-gray-300 px-4 py-2">
              Eggs, chicken, fish, legumes (lentils, beans), tofu, yogurt, nuts, and seeds.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">3</td>
            <td className="border border-gray-300 px-4 py-2">Fats</td>
            <td className="border border-gray-300 px-4 py-2">
              Support brain function, hormone regulation, and provide long-lasting energy.
            </td>
            <td className="border border-gray-300 px-4 py-2">
              Avocados, olive oil, nuts, seeds, and fatty fish (like salmon).
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">4</td>
            <td className="border border-gray-300 px-4 py-2">Vitamins and Minerals</td>
            <td className="border border-gray-300 px-4 py-2">
              Boost immunity, help with focus, and reduce stress.
            </td>
            <td className="border border-gray-300 px-4 py-2">
              Leafy greens (spinach, kale), berries, oranges, apples, carrots, and tomatoes.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">5</td>
            <td className="border border-gray-300 px-4 py-2">Dairy</td>
            <td className="border border-gray-300 px-4 py-2">
              Provide calcium and protein, which are important for bone health and cognitive function.
            </td>
            <td className="border border-gray-300 px-4 py-2">
              Milk, yogurt, cheese, or plant-based alternatives like almond milk or soy yogurt.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">6</td>
            <td className="border border-gray-300 px-4 py-2">Hydration</td>
            <td className="border border-gray-300 px-4 py-2">
              Dehydration can affect concentration, mood, and cognitive performance. Aim for at least 8 cups of water a day.
            </td>
            <td className="border border-gray-300 px-4 py-2">
              Water, herbal teas, coconut water.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">7</td>
            <td className="border border-gray-300 px-4 py-2">Vitamins and Minerals</td>
            <td className="border border-gray-300 px-4 py-2">
              Support energy production, brain function, and overall health.
            </td>
            <td className="border border-gray-300 px-4 py-2">
              Vitamin C (found in citrus fruits), B vitamins (found in whole grains, legumes), iron (found in spinach, beans), and magnesium (found in nuts and seeds).
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Info;
