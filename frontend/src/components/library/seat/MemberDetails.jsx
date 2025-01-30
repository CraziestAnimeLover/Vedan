import { useState, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const MemberDetails = ({ backendSeats }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const listRef = useRef(null);

  // Toggle visibility
  const toggleList = () => setIsExpanded(!isExpanded);

  // Scroll functions
  const scrollUp = () => listRef.current?.scrollBy({ top: -100, behavior: "smooth" });
  const scrollDown = () => listRef.current?.scrollBy({ top: 100, behavior: "smooth" });

  return (
    <div className="mt-8">
      {/* Clickable Heading */}
      <h4 className="text-xl font-semibold mb-4 cursor-pointer flex justify-between items-center" onClick={toggleList}>
        Member Details
        <ChevronDown className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
      </h4>

      {/* Collapsible List */}
      {isExpanded && (
        <div className="relative max-h-60 overflow-hidden border p-2 rounded-lg">
          <ul ref={listRef} className="max-h-60 overflow-y-auto space-y-4">
            {backendSeats.map((seat) => (
              <li key={seat.seatNumber} className={`bg-gray-100 p-4 rounded-lg shadow-md ${seat.memberId ? "bg-green-200" : "bg-red-200"}`}>
                <p>Seat Number: {seat.seatNumber}</p>
                <p>Table No: {seat.tableNo || "N/A"}</p>
                <p>MemberId: {seat.memberId}</p>
                <p>Start Date: {new Date(seat.startDate).toLocaleString()}</p>
                <p>Booking Time: {new Date(seat.bookingTime).toLocaleString()}</p>
                <p>Plan Details: {seat.planDetails || "N/A"}</p>
                <p>Payment Method: {seat.paymentMethod || "N/A"}</p>
                <p>Paid Amount: {seat.paidAmount ? seat.paidAmount : "N/A"}</p>
                <p>Due Amount: {seat.dueAmount ? seat.dueAmount : "N/A"}</p>
                <p>Next Bill Date: {seat.nextBillDate ? new Date(seat.nextBillDate).toLocaleString() : "N/A"}</p>
              </li>
            ))}
          </ul>

          {/* Scroll Buttons */}
          <div className="absolute right-2 top-2 flex flex-col gap-2">
            <button onClick={scrollUp} className="bg-gray-300 p-2 rounded-full shadow hover:bg-gray-400">
              <ChevronUp size={20} />
            </button>
            <button onClick={scrollDown} className="bg-gray-300 p-2 rounded-full shadow hover:bg-gray-400">
              <ChevronDown size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDetails;
