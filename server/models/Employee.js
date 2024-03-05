const mongoose=require('mongoose')

const EmployeeSchema=new mongoose.Schema({
    Name:String,
    email:String,
    mobileNo:String,
    dob:String,
    //gender:String,
    city:String,
    state:String,
    district:String,
    pincode:String,
    loginId:String,
    password:String,
    confirmPassword:String,
    securityA1:String,
    securityA2:String,
    bar:String,
    id:String,
    
    role:{
        type:String,
        default: "visitor"
    }
    

})

const EmployeeModel=mongoose.model("employees",EmployeeSchema)
module.exports=EmployeeModel;