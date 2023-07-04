import userModel from "../models/userModel.js"


//get User Details

export const userDetailsController = async (req, res, next) => {

    const user = await userModel.findOne({ _id: req.user.userId }).select(+"password")
    if (!user) {
        next(`don't have details of this user `)
    }
    user.password = undefined
    res.status(200).json(user)
}

//Update User Details
export const userController = async (req, res, next) => {

    const { name, email, location } = req.body
    if (!name || !email || !location) {
        next('please fill all required fields')
    }
    if (!req.user) {
        next('no data found')
    }
    const user = await userModel.findOne({ _id: req.user.userId })
    user.name = name
    user.email = email
    user.location = location

    await user.save()

    const token = await user.createJWT()

    res.status(201).json({
        user,
        token
    })
}
