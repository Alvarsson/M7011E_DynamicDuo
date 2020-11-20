
const db = require("../src/models");
const TestModel = db.testmodel;

// Create and Save a new Tutorial
exports.create = () => {
  // Validate request

  // Create a Tutorial
  const testmodel = new TestModel({
    title: "tx",
  });
  console.log("S");
  // Save Tutorial in the database
  testmodel
    .save(testmodel)
    .then((data) => {
      console.log("data");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};


// exports.findAll = (req, res) => {
//     const title = req.query.title;
//     var condition = title ? { title: "{ $regex: new RegExp(title), $options: "i" }" } : {};
  
//     testmodel.find(condition)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
//   };
