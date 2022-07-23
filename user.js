const mongoose = require("mongoose");

//
// const entriesSchema = new mongoose.Schema({
//   exposure: {
//     type: String,
//     required: [true, "Please fill in exposure."]
//   },
//   description: {
//     type: String,
//     required: [true, "Please fill in description."]
//   },
//   feeling: {
//     type: String,
//     required: [true, "Please fill in description."]
//   }
// });
// module.exports = mongoose.model("Entry", entriesSchema);
const userSchema = new mongoose.Schema({
  email: {
    _id:Number,
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  entries:[
  {
    exposure: {
      type: String,
      required: [true, "Please fill in exposure."]
    },
    description: {
      type: String,
      required: [true, "Please fill in description."]
    },
    feeling: {
      type: String,
      required: [true, "Please fill in description."]
    },
    date:{
      type:String,
    },
    tag:[
          {
            _id:Number,
            type:String,
            required: [true, "Tag Required"]
          },
      ],
  },
],
tags:[
  {
  concern:{
  _id:Number,
  type:String,
  required: true,
  },
},
],
});
const User = mongoose.model("User", userSchema);

module.exports = User;
