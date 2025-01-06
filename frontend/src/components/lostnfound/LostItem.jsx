import React, { useState } from "react";
import LostItemInput from "./LostItemInput";
import LostItemDisplay from "./LostItemDisplay";
import PostList from "./PostList";
import Navbar from "../shared/Navbar";

const LostItem = () => {
  const [lostItemDetails, setLostItemDetails] = useState(null);

  const handleItemDetails = (details) => {
    setLostItemDetails(details); // Update state with the submitted details
  };

  return (
    <>
      <Navbar />
      <div className="flex space-x-8 p-8">
        {/* Left side: Input Form */}
        {/* <div className="w-1/2">
          <LostItemInput onSubmit={handleItemDetails} />
        </div> */}

        {/* Right side: Display the Submitted Details */}
        {/* <div className="w-1/2">
          {lostItemDetails ? (
            <LostItemDisplay details={lostItemDetails} />
          ) : (
            <p className="text-gray-500">No item details submitted yet.</p>
          )}
        </div> */}
      </div>

      <div>
      <h1 className="text-center text-3xl font-bold my-6">Lost and Found</h1>
      <PostList />
    </div>
    </>
  );
};

export default LostItem;
