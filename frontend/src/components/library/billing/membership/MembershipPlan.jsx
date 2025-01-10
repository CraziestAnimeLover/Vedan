import React from "react";
import { FaFileInvoiceDollar } from "react-icons/fa"; // Importing the billing icon

const MembershipPlan = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-700">Library Membership Plans</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-6 text-center">Plan</th>
              <th className="py-3 px-6 text-center">Fee</th>
              <th className="py-3 px-6 text-center">Affordable</th>
              <th className="py-3 px-6 text-center">Standard</th>
              <th className="py-3 px-6 text-center">Premium</th>
              <th className="py-3 px-6 text-center">Benefits</th>
              <th className="py-3 px-6 text-center">
                <FaFileInvoiceDollar className="inline-block text-xl" /> {/* Billing Icon */}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="py-3 px-6 text-center">Basic</td>
              <td className="py-3 px-6 text-center">$10/month</td>
              <td className="py-3 px-6 text-center">✓</td>
              <td className="py-3 px-6 text-center">✘</td>
              <td className="py-3 px-6 text-center">✘</td>
              <td className="py-3 px-6 text-center">Access to basic library resources</td>
              <td className="py-3 px-6 text-center"><FaFileInvoiceDollar className="text-xl" /></td> {/* Billing Icon */}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="py-3 px-6 text-center">Standard</td>
              <td className="py-3 px-6 text-center">$20/month</td>
              <td className="py-3 px-6 text-center">✓</td>
              <td className="py-3 px-6 text-center">✓</td>
              <td className="py-3 px-6 text-center">✘</td>
              <td className="py-3 px-6 text-center">Access to books, online resources, and events</td>
              <td className="py-3 px-6 text-center"><FaFileInvoiceDollar className="text-xl" /></td> {/* Billing Icon */}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="py-3 px-6 text-center">Premium</td>
              <td className="py-3 px-6 text-center">$30/month</td>
              <td className="py-3 px-6 text-center">✓</td>
              <td className="py-3 px-6 text-center">✓</td>
              <td className="py-3 px-6 text-center">✓</td>
              <td className="py-3 px-6 text-center">Access to all resources, exclusive events, and free workshops</td>
              <td className="py-3 px-6 text-center"><FaFileInvoiceDollar className="text-xl" /></td> {/* Billing Icon */}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          Sign Up Now
        </button>
      </div>
    </div>
  );
};

export default MembershipPlan;
