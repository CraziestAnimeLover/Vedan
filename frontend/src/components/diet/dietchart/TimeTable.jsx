import React, { useState } from 'react';

const TimeTable = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Function to generate time slots automatically in 1-hour intervals
  const generateTimeSlots = (startTime = "9:00 AM", slots = 7) => {
    let timeSlots = [];
    let currentTime = new Date(`01/01/2000 ${startTime}`);
    
    for (let i = 0; i < slots; i++) {
      let nextTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
      timeSlots.push({
        start: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        end: nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      });
      currentTime = nextTime;
    }
    return timeSlots;
  };

  const [timeRanges, setTimeRanges] = useState(generateTimeSlots());
  const [schedule, setSchedule] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = timeRanges.reduce((timeAcc, range) => {
        timeAcc[range.start] = ''; // Store activity for each time slot
        return timeAcc;
      }, {});
      return acc;
    }, {})
  );

  // Helper function to format time into 12-hour format
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // Handle time range updates dynamically (both start and end time editable)
  const handleTimeRangeChange = (e, index, type) => {
    const newTime = e.target.value;
    let newRanges = [...timeRanges];
    const currentTime = new Date(`01/01/2000 ${newTime}`);

    if (type === 'start') {
      // Update the start time for the current slot
      newRanges[index].start = formatTime(currentTime);
      
      // Adjust the end time for the current slot (ensure 1-hour duration)
      let endTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // default 1-hour duration
      newRanges[index].end = formatTime(endTime);

      // Adjust all subsequent times based on the current slot's start time
      for (let i = index + 1; i < newRanges.length; i++) {
        let previousEndTime = new Date(`01/01/2000 ${newRanges[i - 1].end}`);
        let newStartTime = new Date(previousEndTime.getTime());
        newRanges[i].start = formatTime(newStartTime);
        
        let newEndTime = new Date(newStartTime.getTime() + 60 * 60 * 1000); // 1-hour increment
        newRanges[i].end = formatTime(newEndTime);
      }
    } else if (type === 'end') {
      // Update the end time for the current slot
      newRanges[index].end = formatTime(currentTime);

      // Adjust the start time of the next slot (set to 1 minute after the current end time)
      if (index + 1 < newRanges.length) {
        let nextStartTime = new Date(currentTime.getTime() + 60 * 1000); // 1 minute after the end time
        newRanges[index + 1].start = formatTime(nextStartTime);
        
        let nextEndTime = new Date(nextStartTime.getTime() + 60 * 60 * 1000); // 1-hour increment
        newRanges[index + 1].end = formatTime(nextEndTime);
      }
    }

    setTimeRanges(newRanges);
  };

  // Handle input changes for activities
  const handleInputChange = (e, day, rangeStart) => {
    const newSchedule = { ...schedule };
    newSchedule[day][rangeStart] = e.target.value;
    setSchedule(newSchedule);
  };

  // Handle adding a new time slot
  const addTimeSlot = () => {
    let lastEndTime = timeRanges[timeRanges.length - 1].end;
    let newStartTime = new Date(`01/01/2000 ${lastEndTime}`);
    let newEndTime = new Date(newStartTime.getTime() + 60 * 60 * 1000);

    setTimeRanges([...timeRanges, {
      start: formatTime(newStartTime),
      end: formatTime(newEndTime)
    }]);
  };

  // Handle removing a time slot
  const removeTimeSlot = (index) => {
    if (timeRanges.length > 1) {
      setTimeRanges(timeRanges.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Schedule:', schedule);
    console.log('Updated Time Ranges:', timeRanges);
  };

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-md overflow-x-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between items-center mb-2">
          <button onClick={addTimeSlot} type="button" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Add Time Slot</button>
        </div>
        
        {/* Time Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-center font-semibold">Day</th>
                {timeRanges.map((range, index) => (
                  <th key={index} className="border border-gray-300 px-4 py-2 text-center font-semibold relative">
                    <div className="flex flex-col items-center">
                      <input
                        type="time"
                        value={range.start.slice(0, 5)} // Format the time as HH:MM
                        onChange={(e) => handleTimeRangeChange(e, index, 'start')}
                        className="border border-gray-400 p-1 rounded-md w-24 text-center"
                      />
                      <span className="mx-2">-</span>
                      <input
                        type="time"
                        value={range.end.slice(0, 5)} // Format the time as HH:MM
                        onChange={(e) => handleTimeRangeChange(e, index, 'end')}
                        className="border border-gray-400 p-1 rounded-md w-24 text-center"
                      />
                    </div>
                    {index > 0 && (
                      <button onClick={() => removeTimeSlot(index)} type="button" className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6">×</button>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map((day) => (
                <tr key={day}>
                  <td className="border border-gray-300 px-4 py-2 font-semibold text-center bg-gray-50 sticky left-0">
                    {day}
                  </td>
                  {timeRanges.map((range) => (
                    <td key={range.start} className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={schedule[day][range.start] || ''}
                        onChange={(e) => handleInputChange(e, day, range.start)}
                        className="border border-gray-400 p-2 rounded-md w-full text-center"
                        placeholder="Add activity"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6">
          <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">Submit / Update Schedule</button>
        </div>
      </form>
    </div>
  );
};

export default TimeTable;
