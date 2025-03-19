import { Schema, model } from "mongoose";

const WorkoutPlanSchema = new Schema({
  workouts: {
    type: [String],
    required: true,
  },
});

export default model("WorkoutPlan", WorkoutPlanSchema);