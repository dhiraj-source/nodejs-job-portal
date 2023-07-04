export const testController = (req, res) => {
    const { name } = req.body
    res.status(200).send({
        success: true,
        message: `your name is ${name}`,
        name
    })
}

import userModel from "../models/userModel.js";


export const registerController = async (req, res, next) => {

    const { name, email, password, location } = req.body;


    // if (!name || !email || !password) {
    //     next('please provide all required input field')
    // }

    // const exsistingUser = await userModel.findOne({ email })
    // if (exsistingUser) {
    //     next(`user is already register Please Login ${email}`)
    // }

    const user = await userModel.create({ name, email, password, location })
    const token = user.createJWT()
    res.status(200).send({
        success: true,
        message: "registeration successfully Done!!",
        user: {
            name: user.name,
            email: user.email,
            location: user.location
        },
        token
    })

}

export const userLoginController = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        next('please enter all fields')
    }

    const user = await userModel.findOne({ email }).select("+password")
    if (!user) {
        next('user is not register yet')
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        next('Invalid username and password')
    }

    user.password = undefined
    const token = user.createJWT()
    res.status(200).json({
        success: true,
        message: "you are Login",
        user,
        token
    })
}

