import Schedule from '../models/Schedule.js';


export async function createSchedule(req, res) {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getSchedules(req, res) {
  try {
    const schedules = await find();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateSchedule(req, res) {
  try {
    const updatedSchedule = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteSchedule(req, res) {
  try {
    await findByIdAndDelete(req.params.id);
    res.json({ message: 'Schedule deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
