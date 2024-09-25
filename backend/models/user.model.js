import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    phoneNumber  : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['student', 'recruiter'], // Select any one value 
        required : true
    },
    profile : {
        bio : {type : String},
        skills : [{type: String}],
        resume : { type: String}, // URL of resume file
        resumeOriginalName : {type : String},
        company : {type:mongoose.Schema.Types.ObjectId , ref : "Company"},
        Profile_Photo : {
            type : String,
            default : ""
        }
    }
},{timestamps : true});
export const user = mongoose.model('user', userSchema)