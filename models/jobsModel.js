import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "company name required"]
    },
    position: {
        type: String,
        required: [true, 'job position is required'],
        maxLength: 100
    },
    status: {
        type: String,
        enum: ["reject", "pending", "interview"],
        default: "pending"
    },
    workType: {
        type: String,
        enum: ["full-time", "part-time", "internship", "contaract"],
        default: "full-time"
    },
    workLocation: {
        type: String,
        default: "Delhi",
        required: [true, "work location is required"]
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

}, { stampsTime: true })
export default mongoose.model('Job', jobSchema)