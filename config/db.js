import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
         console.log(`database succesfully conneccted to host ${mongoose.connection.host}`.bgYellow.black)
    } catch (error) {
        error
         console.log(error)
    }

}
export default connectDB













// //special character need to be Encoded
// // p@ssw0rd'9'!
// //p%40ssw0rd%279%27%21


