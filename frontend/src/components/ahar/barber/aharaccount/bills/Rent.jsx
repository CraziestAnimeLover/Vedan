import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Euro,
  PoundSterling,
  IndianRupee,
  JapaneseYen,
} from "lucide-react";

const currencies = {
  USD: { rate: 1, icon: <DollarSign size={16} /> },
  EUR: { rate: 0.92, icon: <Euro size={16} /> },
  GBP: { rate: 0.79, icon: <PoundSterling size={16} /> },
  INR: { rate: 82, icon: <IndianRupee size={16} /> },
  JPY: { rate: 150, icon: <JapaneseYen size={16} /> },
};

const CurrencySelector = ({
  currency,
  onCurrencyChange,
  index,
  showCurrencyList,
}) => {
  return (
    <div className="relative">
      <button
        onClick={() => onCurrencyChange(index)}
        className="p-1 border rounded"
      >
        {currencies[currency].icon} {currency}
      </button>
      {showCurrencyList === index && (
        <div className="currency-list absolute bg-white border shadow-md p-2 w-40">
          {Object.keys(currencies).map((curr) => (
            <button
              key={curr}
              onClick={() => onCurrencyChange(index, curr)}
              className="w-full p-2 text-left"
            >
              {currencies[curr].icon} {curr}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Rent = () => {
  const [rentBills, setRentBills] = useState([
    {
      id: 1,
      billFrom: "",
      billTo: "",
      rentAmount: 0,
      billingDate: "",
      remark: "",
      currency: "USD",
      isEditing: false,
    },
  ]);

  const [isValid, setIsValid] = useState(true);
  const [showCurrencyList, setShowCurrencyList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRentChange = (index, field, value) => {
    if (field === "rentAmount") {
      value = parseFloat(value) || 0;
    }

    setRentBills((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );

    validateForm(); // Validate on each change
  };

  const addRentBill = () => {
    setRentBills([
      ...rentBills,
      {
        id: rentBills.length + 1,
        billFrom: "",
        billTo: "",
        rentAmount: 0,
        billingDate: "",
        remark: "",
        currency: "USD",
        isEditing: false,
      },
    ]);
  };

  const removeRentBill = (index) => {
    setRentBills(rentBills.filter((_, i) => i !== index));
  };

  const handleCurrencyChange = (index, newCurrency) => {
    setRentBills((prev) =>
      prev.map((row, i) => {
        if (i === index) {
          const baseAmount = row.rentAmount / currencies[row.currency].rate; // Convert to USD
          const newAmount = baseAmount * currencies[newCurrency].rate; // Convert to new currency
          return {
            ...row,
            currency: newCurrency,
            rentAmount: newAmount.toFixed(2),
          };
        }
        return row;
      })
    );
  
    setTimeout(() => setShowCurrencyList(null), 100); // Allow click event to register
    validateForm(); // Validate on currency change
  };
  

  const toggleEdit = (index) => {
    setRentBills((prev) =>
      prev.map((row, i) =>
        i === index ? { ...row, isEditing: !row.isEditing } : row
      )
    );
  };

  const validateForm = () => {
    let isValid = true;
    let errorMessages = {};

    rentBills.forEach((bill, index) => {
      if (!bill.billFrom) {
        isValid = false;
        errorMessages[`billFrom-${index}`] = "Bill From is required.";
      }
      if (!bill.billTo) {
        isValid = false;
        errorMessages[`billTo-${index}`] = "Bill To is required.";
      }
      if (!bill.rentAmount || isNaN(bill.rentAmount)) {
        isValid = false;
        errorMessages[`rentAmount-${index}`] =
          "Rent Amount is required and should be a valid number.";
      }
      if (!bill.billingDate) {
        isValid = false;
        errorMessages[`billingDate-${index}`] = "Billing Date is required.";
      }
    });

    setIsValid(isValid);
    setErrorMessage(errorMessages); // Set specific error messages

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      console.error("Validation failed");
      return;
    }
  
    setIsLoading(true);
    setErrorMessage(""); // Reset previous errors
  
    const rentBillData = rentBills.map(({ id, isEditing, ...bill }) => bill);
  
    try {
      const response = await fetch("http://localhost:8000/api/rent-bills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rentBills: rentBillData }), // Wrapping inside an object
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to save rent bills");
      }
  
      console.log("Rent Bills Saved Successfully:", data);
    } catch (error) {
      console.error("Error during fetch:", error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    const closeCurrencyList = (event) => {
      if (!event.target.closest(".currency-list")) {
        setShowCurrencyList(null);
      }
    };
    document.addEventListener("click", closeCurrencyList);
    return () => {
      document.removeEventListener("click", closeCurrencyList);
    };
  }, []);

  return (
    <div className="p-4 flex flex-col items-center w-full">
      <div className="w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-2 text-center">Rent Bills</h2>

        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}

        <div className="overflow-x-auto max-h-96">
          <table className="w-full table-fixed border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 w-1/12" rowSpan={2}>
                  Sr. No
                </th>
                <th className="border p-2 w-1/3" colSpan={2}>
                  Bill Time
                </th>
                <th className="border p-2 w-1/6" rowSpan={2}>
                  Rent Amount
                </th>
                <th className="border p-2 w-1/6" rowSpan={2}>
                  Billing Date
                </th>
                <th className="border p-2 w-1/6" rowSpan={2}>
                  Remark
                </th>
                <th className="border p-2 w-1/12" rowSpan={2}>
                  Actions
                </th>
              </tr>
              <tr className="bg-gray-200">
                <th className="border p-2 w-1/6">From</th>
                <th className="border p-2 w-1/6">To</th>
              </tr>
            </thead>

            <tbody>
              {rentBills.map((row, index) => (
                <tr key={row.id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={row.billFrom}
                      onChange={(e) =>
                        handleRentChange(index, "billFrom", e.target.value)
                      }
                      className="border p-1 w-full"
                    />
                    {errorMessage[`billFrom-${index}`] && (
                      <p className="text-red-500">
                        {errorMessage[`billFrom-${index}`]}
                      </p>
                    )}
                  </td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={row.billTo}
                      onChange={(e) =>
                        handleRentChange(index, "billTo", e.target.value)
                      }
                      className="border p-1 w-full"
                      disabled={!row.isEditing}
                    />
                  </td>
                  <td className="border p-2">
                    <div className="flex items-center gap-2">
                      <CurrencySelector
                        currency={row.currency}
                        onCurrencyChange={handleCurrencyChange}
                        index={index}
                        showCurrencyList={showCurrencyList}
                      />
                      <input
                        type="number"
                        value={row.rentAmount}
                        onChange={(e) =>
                          handleRentChange(index, "rentAmount", e.target.value)
                        }
                        className="border p-1 w-full"
                        disabled={!row.isEditing}
                      />
                    </div>
                  </td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={row.billingDate}
                      onChange={(e) =>
                        handleRentChange(index, "billingDate", e.target.value)
                      }
                      className="border p-1 w-full"
                      disabled={!row.isEditing}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.remark}
                      onChange={(e) =>
                        handleRentChange(index, "remark", e.target.value)
                      }
                      className="border p-1 w-full"
                      disabled={!row.isEditing}
                    />
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => toggleEdit(index)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      {row.isEditing ? "Save" : "Edit"}
                    </button>
                    <button
                      onClick={() => removeRentBill(index)}
                      className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-2">
          <button
            onClick={addRentBill}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Rent Bill
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {isLoading ? "Saving..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rent;
