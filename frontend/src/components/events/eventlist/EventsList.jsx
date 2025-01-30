import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardTitle } from '../../ui/Card.jsx';
import EventService from '../../events/EventService.js';

const EventCard = ({ event }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="p-4">
      <Card className="w-80 flex flex-col justify-between rounded-2xl shadow-lg overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-40 object-cover" // Fixed height and width
        />
        <CardContent className="flex flex-col flex-grow p-4">
          <CardTitle className="text-xl font-semibold">{event.title}</CardTitle>
          <p className="text-gray-500">
            {event.date === 'Coming Soon' ? (
              <span className="text-yellow-500 font-semibold">Coming Soon</span>
            ) : (
              <>
                {event.date} -{' '}
                <a
                  href={event.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {event.location}
                </a>
              </>
            )}
          </p>
          <p className="mt-2 text-sm text-gray-700">{event.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events on component mount
    const fetchEvents = async () => {
      const eventsData = await EventService.getEvents();
      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsList;
