

const Hapi = require("@hapi/hapi");
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)
const employee = require("../models/employee");
// Employee model
const init = async () => {

const Employee = require("../models/employee");
const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});
await server.register({
  plugin: require('hapi-mongodb'),
  options: {
    url: 'mongodb+srv://{YOUR-USERNAME}:{YOUR-PASSWORD}@main.zxsxp.mongodb.net/sample_mflix?retryWrites=true&w=majority',
    settings: {
        useUnifiedTopology: true
    },
    decorate: true
  }
});
// @route   GET /api/employee/
// @desc    Get all employee
// @access  Public
server.route({
  method: 'GET',
  path: '/api/employee/getlist',
  handler: (request, h)  => {
    
  try {
    let parsedObject;
    if (request.query.passingObject) {
      parsedObject = JSON.parse(request.query.passingObject);
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
    h.send({ employee });
    return employee;
  } catch (err) {
    throw Boom.notFound( err);
  }
  
}});

// @route   GET /api/employee/:id
// @desc    Get a specific employee
// @access  Public
server.route({
  method: 'GET',
  path:'/:id',
  handler: (request, h) => {
  try {
    const employee = await Employee.findById(request.params.id);
    h.send({ employee });
    return employee;
  } catch (err) {
    throw Boom.notFound({ message: "Employee not found!" });
  }
  
}});
// @route   GET /api/employee/count
// @desc    Get  employee count
// @access  Public
server.route({
  method: 'GET',
  path:'/count',
  handler: (request, h) => {
  try {
    const employee = await Employee.count(request.query.passingObject);
    h.send({ employee });
    return employee;
  } catch (err) {
    throw Boom.notFound({ message: "Employee not found!" });
  }
  
}});
// @route   POST /api/employee/
// @desc    Create a employee
// @access  Public
server.route({
  method: ['PUT', 'POST'],
  path: '/',
  handler: function (request, h)  {
  try {
    const newEmployee = await Employee.create({
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email,
      mobile: request.body.mobile,
      gender: request.body.gender,
      designation: request.body.designation,
      dateofjoining: request.body.dateofjoining,
      reportingmanager: request.body.reportingmanager,
      salary: request.body.salary,
      employeecode: request.body.employeecode,
      location: request.body.location,
      state: request.body.state,
      country: request.body.country,
      department: request.body.department,
      deletedAt: null,
    });
    h.send({ newEmployee });
    return employee;
  } catch (err) {
    throw Boom.notFound(err);
  }
  
}});

// @route   PUT /api/employee/:id
// @desc    Update a employee
// @access  Public
server.route({
  method: ['PUT', 'POST'],
  path: '/:id',
  handler: function (request, h) {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    h.send({ message: "The employee was updated" });
  } catch (err) {
    console.log(err)
    throw Boom.notFound(err);
  }
  return employee;
}});

// @route   DELETE /api/employee/:id
// @desc    Delete a employee
// @access  Public
server.route({
  method: 'DELETE',
  path:'/:id',
  handler: (request, h) => {
  try {
    const foundedEmployee = await Employee.findById(request.params.id);
    foundedEmployee["deletedAt"] = new Date();
    const removeEmployee = await Employee.findByIdAndUpdate(
      request.params.id,
      foundedEmployee
    );
    h.send({ message: "The employee was removed" });
  } catch (err) {
    throw Boom.notFound( err );
  }
  return employee;
}});

server.route({
  method: 'DELETE',
  path:'/activate/:id',
  handler: (request, h) => {
  try {
    const foundedEmployee = await Employee.findById(request.params.id);
    foundedEmployee["deletedAt"] = null;
    const removeEmployee = await Employee.findByIdAndUpdate(
      request.params.id,
      foundedEmployee
    );
    h.send({ message: "The employee was removed" });
  } catch (err) {
    throw Boom.notFound(err );
  }
  return employee;
}});
await server.start();

};
init();