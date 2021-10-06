const mongoose = require("mongoose");

// database connect
require("dotenv").config({ path: "./.env" });

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("server is running "))
  .catch((err) => console.error("Failed to connect"));

// Create a person prototype (SCHEMA)

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
//  create the model
const Person = mongoose.model("person", personSchema);
//  Create and Save a Record of a Model:

 let newPerson = new Person({
   name: "yahya",
   age: 28,
  favoriteFoods: ["koskosi", "spagetti"],
});
newPerson.save((err) => {
  if (err) throw err;
  console.log("newPerson added succesfully!");
});
// Create Many Records with model.create()

let arrayOfPerson = [
  { name: "Ali", age: 26, favoriteFoods: ["Gnaweya", "burger"] },
  { name: "Ahmed", age: 29, favoriteFoods: ["ma9rouna", "loubya"] },
  { name: "salah", age: 40, favoriteFoods: ["5ou5a", "banana"] },
  { name: "azri", age: 27, favoriteFoods: ["baguette", "mlou5iya"] },
  { name: "fat7i", age: 30, favoriteFoods: ["ma9loub", "sandwich"] },
];
Person.create(arrayOfPerson)
  .then((persons) => {
    console.log("Persons are succesfully saved!", persons);
  })
  .catch((err) => console.log(err));
  // Find all the people having the name salah

Person.find({ name: "salah" }, function (err, res) {
  if (err) throw err;
  console.log(res);
});
//  find one person's favorite food is ma9loub
Person.findOne({ favoriteFoods: "ma9loub" }, function (err, res) {
  if (err) throw err;
  console.log(res);
});
// find person by id
let personId = "60cfa322cb506d1f109fcfb1";
Person.findById(personId, function (err, res) {
  if (err) throw err;
  console.log(res);
});
//adding humberger as a favoritefood to the person with personId

Person.findById(personId).then((person) => {
  person.favoriteFoods.push("humberger");
  person.save();
});
// Perform New Updates on a Document Using model.findOneAndUpdate()

let personName = "salah";
Person.findOneAndUpdate(
  { name: personName },
  { $set: { age: 31 } },
  { new: true }
);

// Delete One Document Using model.findByIdAndRemove
const nameToRemove = "fat7i";
Person.remove({ name: nameToRemove }, function (err, res) {
  if (err) throw err;
  console.log(res);
});

// Chain Search Query Helpers to Narrow Search Results
var queryChain = function (done) {
  var foodToSearch = "burger";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) done(err);
      done(null, data);
    });
};