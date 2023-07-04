import mongoose from "mongoose"
import jobsModel from "../models/jobsModel.js"
import moment from "moment"

// //get all jobs
// export const allJobsController = async (req, res, next) => {
//     const job = await jobsModel.find({ createdBy: req.user.userId })
//     if (!job) {
//         next('jobs either empty or not created yet')
//     }
//     res.status(201).json({
//         totalJobs: job.length,
//         job
//     })
// }


//GET JOB WITH filter added

export const allJobsController = async (req, res) => {

    const { status, workType, search, sort } = req.query
    //condition for searching

    const queryObject = {
        createdBy: req.user.userId
    }
    // console.log(queryObject)

    //logic filters  
    if (status && status !== "All") {
        queryObject.status = status
    }

    if (workType && workType !== "All") {
        queryObject.workType = workType
    }
    if (search) {
        queryObject.position = { $regex: search, $options: "i" }
    }
    //console.log(queryObject)
    //{ createdBy: '649d5f99c3fe40825b8a535f', status: 'reject' } this is the result of above console.log
    let queryResult = jobsModel.find(queryObject)
    //Sorting
    if (sort === 'latest') {
        queryResult = queryResult.sort('-createdAt')

    }
    if (sort === 'oldest') {
        queryResult = queryResult.sort('createdAt')
    }
    if (sort === 'a-z') {
        queryResult = queryResult.sort("position")
    }
    if (sort === 'z-a') {
        queryResult = queryResult.sort("-position")
    }
    //PAGINATION
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    queryResult = queryResult.skip(skip).limit(limit)

    //jobs count
    // console.log("find this one", queryResult)
    const totalJobs = await jobsModel.countDocuments(queryResult)
    // console.log("number of", totalJobs)
    const numOfPage = Math.ceil(totalJobs / limit)

    const job = await queryResult

    res.status(201).json({
        totalJobs,
        job,
        numOfPage
    })



}

// Create job
export const createJobsController = async (req, res, next) => {
    const { company, position } = req.body
    if (!company || !position) {
        next('please enter the required field')
    }

    req.body.createdBy = req.user.userId

    const job = await jobsModel.create(req.body)
    res.status(201).json(job)
}

//Update jobs
export const updateJobsController = async (req, res, next) => {
    const { id } = req.params;
    const { company, position } = req.body
    if (!company || !position) {
        next('please enter all fields')
    }
    const job = await jobsModel.findOne({ _id: id })

    //Validation
    if (!job) {
        next(`no job found in this ${job}`)
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next("you are not authorized to modified this job")
        return
    }

    const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })
    res.status(201).json(updateJob)

}


//delete jobs

export const deleteJobsController = async (req, res, next) => {
    const { id } = req.params;

    const job = await jobsModel.findOne({ _id: id })
    if (!job) {
        next(`no job found for id ${id}`)
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next("you are not authorized to delete this job")
        return
    }

    await job.deleteOne()

    res.status(200).json({ message: "job has been Deleted" })

}


//Filter and stats

export const filterJobController = async (req, res) => {
    const stats = await jobsModel.aggregate([
        //search by user job
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: '$status', count: { $sum: 1 }
            }
        }
    ])

    //default stats
    const defaultStats = {
        pending: stats.pending || 0,
        reject: stats.reject || 0,
        interview: stats.interview || 0
    }

    //monthly yearly stats
    let monthlyApplication = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                },
                count: {
                    $sum: 1
                }
            }
        }
    ])
    monthlyApplication = monthlyApplication.map(item => {
        const { _id: { year, month }, count } = item
        const date = moment().month(month - 1).year(year).format('MMM Y')
        return { date, count };
    }).reverse()

    res.status(200).json({ totalJobs: stats.length, defaultStats, monthlyApplication });
}