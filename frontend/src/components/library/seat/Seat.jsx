import React, { useState, useEffect, useMemo ,useRef} from "react";
import SeatForm from "./SeatForm";
import { ChevronDown, ChevronUp } from "lucide-react";
import MemberDetails from "./MemberDetails";

const Seat = ({ timeSlot }) => {
  const [seats, setSeats] = useState([]);
  const [backendSeats, setBackendSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [rowCount, setRowCount] = useState(5);
  const [colCount, setColCount] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [foundSeat, setFoundSeat] = useState(null);
  const [error, setError] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
    const listRef = useRef(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [submittedData, setSubmittedData] = useState(null); // Store submitted data here
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();


  const memberId = sessionStorage.getItem("memberId");
 

  // Scroll functions
  const scrollUp = () => listRef.current?.scrollBy({ top: -100, behavior: "smooth" });
  const scrollDown = () => listRef.current?.scrollBy({ top: 100, behavior: "smooth" });

  // Fetch seat data from backend
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/book-seat");
        if (!response.ok) throw new Error("Failed to fetch seat data.");
        const data = await response.json();
        setBackendSeats(data);
      } catch (error) {
        console.error("Error fetching backend data:", error);
        setError("Failed to load seat data. Please try again later.");
      }
    };
    fetchSeats();
  }, []);


 ;

 
  // Generate seat matrix based on rowCount, colCount, and backend seat data
  const generateSeatMatrix = useMemo(() => {
    const matrix = [];
    let seatNumber = 1;
    for (let i = 0; i < rowCount; i++) {
      const row = [];
      for (let j = 0; j < colCount; j++) {
        const backendSeat = backendSeats.find((seat) => seat.seatNumber === seatNumber);
        row.push({
          number: seatNumber++,
          occupied: backendSeat ? true : false,
          memberName: backendSeat?.memberId || null,
          bookingTime: backendSeat?.bookingTime || null,
        });
      }
      matrix.push(row);
    }
    return matrix;
  }, [rowCount, colCount, backendSeats]);

  useEffect(() => {
    setSeats(generateSeatMatrix);
  }, [generateSeatMatrix]);
  useEffect(() => {
    console.log("Backend Seats Data:", backendSeats); // Check the structure
  }, [backendSeats]);
  
 
  // Handle seat click (show details if occupied, or allow booking)
  const handleSeatClick = (rowIndex, colIndex) => {
    const clickedSeat = seats[rowIndex][colIndex];
    if (clickedSeat.occupied) {
      // If seat is occupied, show detailed information
      alert(`Seat Number: ${clickedSeat.number}\nBooked By: ${clickedSeat.memberName}\nBooking Time: ${clickedSeat.bookingTime}`);
      return;
    }
    setSelectedSeat(clickedSeat);
  };

  // Book seat logic
  const bookSeat = async (seatDetails  ) => {
    if (!memberId) {
      alert("Please login to book a seat.");
      return;
    }

    try {
      const requestBody = {
        seatNumber: seatDetails.number,
        memberId,
      };
      const response = await fetch("http://localhost:8000/api/book-seat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data.success) {
        sessionStorage.setItem("memberId", memberId);

        // Update the seat state after successful booking
        setSeats((prevSeats) =>
          prevSeats.map((row) =>
            row.map((seat) =>
              seat.number === seatDetails.number
                ? { ...seat, occupied: true, memberName: memberId, bookingTime: new Date().toISOString() }
                : seat
            )
          )
        );

        // Store the submitted data for SeatDetails component
        setSubmittedData({
          seatNumber: seatDetails.number,
          memberName: memberId,
          bookingTime: new Date().toISOString(),
        });

        // Display booking success message
        alert("Seat booked successfully!");
        setBookingSuccess(true);
        setSelectedSeat(null);
      } else {
        alert("Failed to book seat.");
        setBookingSuccess(false);
      }
    } catch (error) {
      console.error("Error booking seat:", error);
      setError("Error booking seat. Please try again.");
      setBookingSuccess(false);
    }
  };
  const handleSearch = () => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    console.log("Searching for Member ID:", normalizedSearchTerm);
  
    // Find the seat that matches the memberId entered
    const found = seats.flat().find(
      (seat) => seat.memberName && seat.memberName.toLowerCase() === normalizedSearchTerm
    );
    
    console.log("Searching with:", normalizedSearchTerm);
    console.log("Seats member name:", seats.flat().map((seat) => seat.memberName));
  
    if (found) {
      setFoundSeat(found);
      console.log("Seat found:", found);
    } else {
      setFoundSeat(null);
      alert("No seat found with that member ID.");
      console.log("No seat found.");
    }
  };
  
  
  

  // Close seat form modal
  const closeForm = () => setSelectedSeat(null);

  const totalSeats = seats.length * (seats[0]?.length || 0);
  const allottedSeats = seats.flat().filter((seat) => seat.occupied).length || 0;

  const handleAddRow = () => setRowCount((prevRowCount) => prevRowCount + 1);
  const handleRemoveRow = () => rowCount > 1 && setRowCount((prevRowCount) => prevRowCount - 1);
  const handleAddColumn = () => setColCount((prevColCount) => prevColCount + 1);
  const handleRemoveColumn = () => colCount > 1 && setColCount((prevColCount) => prevColCount - 1);

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">{timeSlot} Seat Layout</h3>

      {error && <div className="bg-red-500 text-white p-4 mb-4">{error}</div>}

      {bookingSuccess !== null && (
        <div className={`p-4 mb-4 ${bookingSuccess ? "bg-green-500" : "bg-red-500"} text-white`}>
          {bookingSuccess ? "Seat booked successfully!" : "Booking failed. Please try again."}
        </div>
      )}

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Enter Member ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
        <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Search
        </button>
      </div>

      {foundSeat && (
  <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg mb-6">
    <p className="text-xl font-semibold">Seat Details</p>
    <p>Seat Number: {foundSeat.number}</p>
    <p>Status: {foundSeat.occupied ? "Occupied" : "Available"}</p>
    <p>Booked By: {foundSeat.memberName || "N/A"}</p>
  </div>
)}


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg w-full text-center">
          <p className="text-xl font-semibold">Total Seats</p>
          <p className="text-4xl font-bold">{totalSeats}</p>
        </div>
        <div className={`p-6 rounded-lg shadow-lg w-full text-center ${allottedSeats > 0 ? "bg-red-500" : "bg-green-500"} text-white`}>
          <p className="text-xl font-semibold">Allotted (Occupied) Seats</p>
          <p className="text-4xl font-bold">{allottedSeats}</p>
        </div>
      </div>

      <div className="flex justify-center mb-6 flex-wrap gap-4">
        <button onClick={handleAddRow} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto">Add Row</button>
        <button onClick={handleRemoveRow} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto">Remove Row</button>
        <button onClick={handleAddColumn} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto">Add Column</button>
        <button onClick={handleRemoveColumn} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto">Remove Column</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <tbody>
            {seats.map((row, rowIndex) => (
              row.some((seat) => seat.number !== undefined) && (
                <tr key={rowIndex}>
                  {row.map((seat, colIndex) => (
                    seat.number !== undefined && (
                      <td
                        key={colIndex}
                        className={`py-2 px-4 border cursor-pointer 
                          ${seat.occupied ? "bg-green-500" : seat === selectedSeat ? "bg-yellow-300" : 
                            rowIndex === selectedSeat?.rowIndex || colIndex === selectedSeat?.colIndex ? "bg-yellow-200" : "bg-red-200"}`}
                        onClick={() => handleSeatClick(rowIndex, colIndex)}
                      >
                        {seat.number}
                      </td>
                    )
                  ))}
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>

      {/* Display booked seat details at the bottom */}
      
      <MemberDetails  backendSeats ={ backendSeats }/>
    

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
    
      {selectedSeat && (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity opacity-0 animate-fade-in" aria-hidden="true"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-gray-100 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-slide-up">
                <div className="absolute top-24 right-4">
                  <button onClick={closeForm} className="text-gray-600 text-xl font-bold">
                    X
                  </button>
                </div>
                <div className="px-4 pb-4 pt-8 mt-16 sm:p-6 sm:pb-4">
                  <SeatForm seatNumber={selectedSeat.number} onClose={closeForm} />
                  <button onClick={() => bookSeat(selectedSeat)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Book Seat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Seat;
