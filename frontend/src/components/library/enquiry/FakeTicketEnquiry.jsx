import React, { useState, useEffect } from "react";
import EnquiryCard from "./EnquiryCard";
import Navbar from "../../shared/Navbar";

// Function to generate fake ticket data
const generateFakeTickets = (count) => {
  const statuses = ["Open", "Closed"];
  const priorities = ["High", "Medium", "Low"];
  const titles = [
    "Lost Library Card",
    "Book Not Found",
    "Study Room Booking Issue",
    "Overdue Fine Query",
    "Request for New Book",
  ];
  const descriptions = [
    "User reports a lost library card and requests a replacement.",
    "User is unable to locate a specific book in the library.",
    "User cannot book the study room for their preferred time slot.",
    "User has a question regarding an overdue fine on their account.",
    "User requests the library to procure a new book for research purposes.",
  ];

  return Array.from({ length: count }, (_, id) => ({
    id: id + 1,
    title: titles[Math.floor(Math.random() * titles.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    timestamp: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toLocaleString(), // Random timestamp within the last week
  }));
};

const FakeTicketEnquiry = () => {
  const [tickets, setTickets] = useState([]);

  // Generate tickets on component mount
  useEffect(() => {
    const fakeData = generateFakeTickets(10); // Generate 10 tickets
    setTickets(fakeData);
  }, []);

  const handleResolve = (id) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: "Closed" } : ticket
      )
    );
    alert(`Ticket ID: ${id} resolved.`);
  };

  const handleDelete = (id) => {
    setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== id));
    alert(`Ticket ID: ${id} deleted.`);
  };

  return (
    <>
    <Navbar/>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Enquiry Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <EnquiryCard
            key={ticket.id}
            title={ticket.title}
            description={ticket.description}
            status={ticket.status}
            priority={ticket.priority}
            timestamp={ticket.timestamp}
            onAction={() => handleResolve(ticket.id)}
            onDelete={() => handleDelete(ticket.id)}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default FakeTicketEnquiry;
