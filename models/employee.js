const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  dateofjoining: {
    type: String,
    required: true,
  },
  reportingmanager: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  employeecode: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  deletedAt: {
    type: Date,
    required: false,
    allow: null,
  },
});

module.exports = mongoose.model("employee", employeeSchema);
