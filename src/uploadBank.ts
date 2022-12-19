const mongoose = require('mongoose');
const fs = require("fs");
const path = require("path");

console.log("Loading banks")
import Bank from "./api/models/bank/accounts";

const personFile = path.resolve(__dirname,"./bank.json")
// Database connection
//mongodb://127.0.0.1:27017/loan

mongoose.connect('mongodb+srv://chixcom:lq3NI6Y1oGkbHkyh@cluster0.spyy1.gcp.mongodb.net/?retryWrites=true&w=majority', {
	useNewUrlParser: true ,
	useUnifiedTopology: true
})
.then((connection:any)=>{
console.log("DB Connected")



fs.readFile(personFile, 'utf8', function(err:any, data:any){
      //data = JSON.stringify(data)
      data = JSON.parse(data)
console.log({data})
      let User = Bank;    
User.insertMany( data
     ).then(function(){
	console.log("Data inserted") // Success
 

}).catch(function(error:any){
    console.log("error",error.message)
	///console.log(error)	 // Failure
});

     
});


})
.catch((err:any)=>{
   // console.log(`DB Connection failed, ${err}`)
})
// User model

  

 