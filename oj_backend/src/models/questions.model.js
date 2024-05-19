const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    difficulty: { type: String, required: true },
    constraints: { type: String, required: true },
    topic: { type: String, required: true },
    initialCode: { type: String, required: true },
    boilerPlateCode : {type:String,required: false},
    testCase: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const QuestionsModel = new mongoose.model("Question",questionSchema);

module.exports=QuestionsModel
