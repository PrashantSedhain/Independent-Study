const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const expenseSchema = mongoose.Schema({
  groupName: {type: String, require: true},
  expenseTitle: { type: String, require: true, unique: true },
  userId: { type: String, require: true },
  expenses: [
    {
      spentFor: { type: String, require: true },
      amount: { type: Number, require: true },
      paidBy: { type: String, require: true },
      excludedPersons: { type: Array, require: true },
    },
  ],
});

expenseSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Expense", expenseSchema);

// {
// 	"expenseTitle": "Test",
// 	"userId": "123123123",
// 	"expense": [
// 		{
// 			"spentFor": "HEB",
// 			"amount": 100,
// 			"paidBy": "Anish",
// 			"excludedPersons": ["Prashant", "Suman"]
// 		}
// 	]

// }
