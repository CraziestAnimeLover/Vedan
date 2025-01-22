import React, { useState, useEffect } from "react";
import EnquiryCard from "./EnquiryCard";
import Navbar from "../../shared/Navbar";

const FakeTicketEnquiry = () => {
  const [tickets, setTickets] = useState([]);

  // Fetch tickets from the backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tickets');
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  // Handle resolving a ticket
  const handleResolve = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tickets/${id}/resolve`, {
        method: 'PATCH',
      });
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === id ? { ...ticket, status: 'Closed' } : ticket
        )
      );
    } catch (error) {
      console.error('Error resolving ticket:', error);
    }
  };

  // Handle deleting a ticket
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tickets/${id}`, {
        method: 'DELETE',
      });
      setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== id));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <>
      <Navbar />
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
