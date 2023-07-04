import mongoose from "mongoose";
import JWT from "jsonwebtoken"
import bcrypt from "bcryptjs"


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: "Mumbai"
    }
}, { timestamps: true })

userSchema.pre('save', async function () {
    if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
}

userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
}



export default mongoose.model("User", userSchema)