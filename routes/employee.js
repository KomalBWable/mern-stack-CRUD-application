const { request } = require("express");
const express = require("express");
const router = express.Router();

// Employee model
const Employee = require("../models/employee");

// @route   GET /api/employee/
// @desc    Get all employee
// @access  Public
router.get("/", async (req, res) => {
  try {
    let parsedObject;
    if (req.query.passingObject) {
      parsedObject = JSON.parse(req.query.passingObject);
    }
    let employee;
    if (parsedObject) {
      if (parsedObject.deletedAt == null) {
        employee = await Employee.find(parsedObject);
      } else if (parsedObject.deletedAt == true) {
        parsedObject["deletedAt"] = { $ne: null };
        employee = await Employee.find(parsedObject);
      } else {
        employee = await Employee.find(parsedObject);
      }
    } else {
      employee = await Employee.find({});
    }
    res.send({ employee });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   GET /api/employee/:id
// @desc    Get a specific employee
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.send({ employee });
  } catch (err) {
    res.status(404).send({ message: "Employee not found!" });
  }
});
// @route   GET /api/employee/count
// @desc    Get  employee count
// @access  Public
router.get("/count", async (req, res) => {
  try {
    const employee = await Employee.count(req.query.passingObject);
    res.send({ employee });
  } catch (err) {
    res.status(404).send({ message: "Employee not found!" });
  }
});
// @route   POST /api/employee/
// @desc    Create a employee
// @access  Public
router.post("/", async (req, res) => {
  try {
    const newEmployee = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      mobile: req.body.mobile,
      gender: req.body.gender,
      designation: req.body.designation,
      dateofjoining: req.body.dateofjoining,
      reportingmanager: req.body.reportingmanager,
      salary: req.body.salary,
      employeecode: req.body.employeecode,
      location: req.body.location,
      state: req.body.state,
      country: req.body.country,
      department: req.body.department,
      deletedAt: null,
    });
    res.send({ newEmployee });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   PUT /api/employee/:id
// @desc    Update a employee
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send({ message: "The employee was updated" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE /api/employee/:id
// @desc    Delete a employee
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const foundedEmployee = await Employee.findById(req.params.id);
    foundedEmployee["deletedAt"] = new Date();
    const removeEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      foundedEmployee
    );
    res.send({ message: "The employee was removed" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.delete("/activate/:id", async (req, res) => {
  try {
    const foundedEmployee = await Employee.findById(req.params.id);
    foundedEmployee["deletedAt"] = null;
    const removeEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      foundedEmployee
    );
    res.send({ message: "The employee was removed" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
