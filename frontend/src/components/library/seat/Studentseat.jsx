import React, { useState, useEffect } from 'react';

const Studentseat = ({ memberId }) => {
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/book-seat/${memberId}`);
                if (!response.ok) {
                    throw new Error('Booking not found');
                }
                const data = await response.json();
                setBooking(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (memberId) {
            fetchBookingDetails();
        }
    }, [memberId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Booking Details</h2>
            {booking ? (
                <div>
                    <p><strong>Seat Number:</strong> {booking.seatNumber}</p>
                    <p><strong>Table No:</strong> {booking.tableNo || 'N/A'}</p>
                    <p><strong>Plan Details:</strong> {booking.planDetails || 'N/A'}</p>
                    <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
                    <p><strong>Expiry Date:</strong> {new Date(booking.expiryDate).toLocaleDateString()}</p>
                    <p><strong>Payment Method:</strong> {booking.paymentMethod || 'N/A'}</p>
                    <p><strong>Paid Amount:</strong> {booking.paidAmount}</p>
                    <p><strong>Due Amount:</strong> {booking.dueAmount}</p>
                    <p><strong>Next Bill Date:</strong> {new Date(booking.nextBillDate).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>No booking found.</p>
            )}
        </div>
    );
};

export default Studentseat;
