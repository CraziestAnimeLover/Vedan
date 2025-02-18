import React, { useState, useEffect } from 'react';

const TimeTable = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const formatTimeForInput = (time) => {
    const date = new Date(`01/01/2000 ${time}`);
    return date.toTimeString().slice(0, 5); // Returns "HH:MM"
  };

  const generateTimeSlots = (startTime = "09:00", slots = 7) => {
    let timeSlots = [];
    let currentTime = new Date(`01/01/2000 ${startTime}`);
    
    for (let i = 0; i < slots; i++) {
      let nextTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
      timeSlots.push({
        start: formatTimeForInput(currentTime.toLocaleTimeString()),
        end: formatTimeForInput(nextTime.toLocaleTimeString())
      });
      currentTime = nextTime;
    }
    return timeSlots;
  };

  const [timeRanges, setTimeRanges] = useState(generateTimeSlots());
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    const loadSchedules = async () => {
      const fetchedSchedules = await fetchSchedules();
      if (fetchedSchedules.length > 0) {
        const newSchedule = {};
        fetchedSchedules.forEach(({ day, timeSlots }) => {
          newSchedule[day] = {};
          timeSlots.forEach(({ start, activity }) => {
            newSchedule[day][start] = activity;
          });
        });
        setSchedule(newSchedule);
      }
    };
    loadSchedules();
  }, []);

  const handleTimeRangeChange = (e, index, type) => {
    const newTime = e.target.value;
    let newRanges = [...timeRanges];
    const currentTime = new Date(`01/01/2000 ${newTime}`);

    if (type === 'start') {
      newRanges[index].start = formatTimeForInput(currentTime.toLocaleTimeString());
      let endTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
      newRanges[index].end = formatTimeForInput(endTime.toLocaleTimeString());
    } else if (type === 'end') {
      newRanges[index].end = formatTimeForInput(currentTime.toLocaleTimeString());
    }
    setTimeRanges(newRanges);
  };

  const handleInputChange = (e, day, rangeStart) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day], // Keep existing values
        [rangeStart]: e.target.value, // Update new value
      },
    }));
  };
  

  const addTimeSlot = () => {
    let lastEndTime = timeRanges[timeRanges.length - 1].end;
    let newStartTime = new Date(`01/01/2000 ${lastEndTime}`);
    let newEndTime = new Date(newStartTime.getTime() + 60 * 60 * 1000);

    setTimeRanges([...timeRanges, {
      start: formatTimeForInput(newStartTime.toLocaleTimeString()),
      end: formatTimeForInput(newEndTime.toLocaleTimeString())
    }]);
  };

  const removeTimeSlot = (index) => {
    if (timeRanges.length > 1) {
      setTimeRanges(timeRanges.filter((_, i) => i !== index));
    } else {
      alert("At least one time slot is required.");
    }
  };

  const fetchSchedules = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/schedules");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching schedules:", error);
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedSchedule = {
      name: "My Schedule",  // Optional, you can change this or get it from user input
      days: Object.entries(schedule).map(([day, slots]) => ({
        day,
        slots: Object.entries(slots).map(([start, activity]) => ({
          start,
          end: timeRanges.find((t) => t.start === start)?.end || "00:00",
          activity
        }))
      }))
    };
  
    console.log("Formatted Schedule Data:", JSON.stringify(formattedSchedule, null, 2));
  
    try {
      const response = await fetch("http://localhost:8000/api/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedSchedule)
      });
  
      const responseData = await response.json();
      console.log("Server Response:", responseData);
  
      if (response.ok) alert("Schedule updated successfully!");
      else alert("Error updating schedule");
    } catch (error) {
      console.error("Error submitting schedule:", error);
    }
  };
  
  

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-md overflow-x-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <button onClick={addTimeSlot} type="button" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Add Time Slot</button>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-center">Day</th>
              {timeRanges.map((range, index) => (
                <th key={index} className="border px-4 py-2 text-center relative">
                  <input type="time" value={formatTimeForInput(range.start)} onChange={(e) => handleTimeRangeChange(e, index, 'start')} className="border p-1 rounded-md w-24" />
                  <span className="mx-2">-</span>
                  <input type="time" value={formatTimeForInput(range.end)} onChange={(e) => handleTimeRangeChange(e, index, 'end')} className="border p-1 rounded-md w-24" />
                  {index > 0 && <button onClick={() => removeTimeSlot(index)} type="button" className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6">×</button>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day) => (
              <tr key={day}>
                <td className="border px-4 py-2 text-center bg-gray-50">{day}</td>
                {timeRanges.map((range) => (
                  <td key={range.start} className="border px-4 py-2">
                    <input type="text" value={schedule[day]?.[range.start] || ''} onChange={(e) => handleInputChange(e, day, range.start)} className="border p-2 rounded-md w-full text-center" placeholder="Add activity" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">Submit / Update Schedule</button>
      </form>
    </div>
  );
};

export default TimeTable;
