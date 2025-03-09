import React, { useEffect, useRef, useState } from "react";

const categories = {
  Grocery: [
    "Vegetable",
    "Fruits",
    "Atta",
    "Rice",
    "Dal",
    "Oil (Ghee, Vanspati)",
    "Masala",
    "Dairy Product",
    "Bread",
    "Eggs",
    "Bakery",
    "Biscuits",
    "Dry Fruits",
    "Cereals",
    "Chicken",
    "Meat & Seafood",
    "Fish",
    "Kitchenware",
    "Appliances",
    "Cake",
    "Sauce (Spreads)",
    "Packaged Food",
    "Salt, Sugar & Jaggery",
  ],
  "Snacks & Drink": [
    "Chips",
    "Namkeen",
    "Sweet",
    "Chocolates",
    "Biscuits",
    "Drink",
    "Tea",
    "Coffee",
    "Instant Food",
    "Ice Cream",
    "Frozen Dessert",
    "Noodles",
    "Pasta",
    "Frozen Food",
    "Gourmet Food",
    "Pickles",
    "Health Food",
    "Soup",
  ],
  "Beauty And Personal Care": [
    "Bath & Body Items",
    "Hair Care",
    "Skin & Face Care",
    "Cosmetics",
    "Feminine Hygiene",
    "Masculine Hygiene",
    "Baby Care",
    "Adult Care",
    "Health & Pharma",
    "Sexual Wellness",
    "Mental Wellness",
    "Makeup",
    "Grooming",
    "Perfumes",
    "Oral Care",
    "Applications",
  ],
  "Households & Lifestyle": [
    "Home & Furnishing",
    "Kitchen & Dining",
    "Fashion Accessories",
    "Toys",
    "Pet Supplies",
    "Gardening Essentials",
    "Bulbs & Lights",
    "Batteries",
    "Rack Organizers",
    "Motorbike Helmets",
    "Ladders",
    "Mats",
    "Furniture & Decor",
    "Disinfectants",
    "Tissue Paper",
    "Cleaners & Repellents",
    "Bath Range",
    "Curtains",
    "Bed Sheets",
    "Table Covers",
  ],
  Bags: [
    "Back Pack",
    "Trolley Bags",
    "Hand Bags",
    "Purses",
    "Wallets",
    "Rucksacks",
    "Vanity Bags",
    "Lunch Bags",
    "Trolley Bag Covers",
    "Jewellery Boxes",
  ],
  "Electronics & Applications": [
    "Electrical Needs",
    "Kitchen Appliances",
    "Home Appliances",
    "Personal Care Appliances",
    "Computer Accessories",
    "Mobile Phones",
    "Laptops",
    "Tablets",
  ],
  "Sports & Fitness": [
    "Outdoor Fitness",
    "Indoor Fitness",
  ],
  "Pooja Store": [
    "Idols",
    "Samagri",
  ],
  "Book & Stationary": [
    "Fiction",
    "Education",
    "Non-fiction",
    "Religious & Spiritual",
    "Children Books",
    "Notebooks & Diaries",
    "Pens & Pencils",
    "Art & Craft",
  ],
  Vastram: [
    "Female Footwear",
    "Male Footwear",
    "Shoe Care",
    "Men's Clothing",
    "Women's Clothing",
    "Accessories",
  ],

};

const CategoryPopup = ({ onSelect, onClose }) => {
  const popupRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setVisible(false);
        setTimeout(() => onClose(), 200);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className={`bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full mx-4 transition-all duration-300 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {selectedCategory ? (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-blue-500 hover:underline"
              >
                ← Back
              </button>
            ) : (
              "Select Category"
            )}
          </h2>
          <button
            onClick={() => {
              setVisible(false);
              setTimeout(() => onClose(), 200);
            }}
            className="text-red-500 font-bold text-lg hover:text-red-700"
          >
            ✕
          </button>
        </div>

        {/* Show Main Categories */}
        {!selectedCategory && (
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(categories).map((main) => (
              <div
                key={main}
                className="cursor-pointer bg-gray-100 p-4 rounded-lg text-center hover:bg-blue-100 transition"
                onClick={() => setSelectedCategory(main)}
              >
                <h3 className="font-semibold text-lg text-gray-700">{main}</h3>
              </div>
            ))}
          </div>
        )}

        {/* Show Subcategories when a category is selected */}
        {selectedCategory && (
          <div className="grid grid-cols-3 gap-4">
            {categories[selectedCategory].map((subCategory) => (
              <div
                key={subCategory}
                className="cursor-pointer bg-white shadow-sm rounded-md p-4 text-center hover:bg-blue-100 transition"
                onClick={() => onSelect(subCategory)}
              >
                {subCategory}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPopup;
