const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true }, 
    code: { type: String, required: true },
    input: { type: String, required: false },
    language: { type: String, required: true, default:"cpp" }, 
    status: { type: String, enum: ["Pending", "Accepted", "Wrong Answer", "Time Limit Exceeded", "Compilation Error", "Runtime Error"], default: "Pending" }, // Status of the solution
    timeTaken: { type: Number }, 
    submitted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const SolutionModel = mongoose.model("Solution", solutionSchema);

module.exports = SolutionModel;
