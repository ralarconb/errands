const Errand = require('../models/Errand')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllErrands = asyncWrapper(async (req, res) => {
    const errands = await Errand.find({})
    res.status(200).json({ errands: errands })

    // res.status(200).json({ errands, amount: errands.length })
    // res.status(200).json({ success: true, data: { errands, count: errands.length } })
    // res.status(200).json({ status: "success", data: { errands, count: errands.length } })
})

const createErrand = asyncWrapper(async (req, res) => {
    const errand = await Errand.create(req.body)
    res.status(201).json({ errand: errand })
})

const getErrand = asyncWrapper(async (req, res, next) => {
    const { id: errandID } = req.params
    const errand = await Errand.findOne({ _id: errandID })
    if (!errand) {
        return next(createCustomError(`No item with id : ${errandID}`, 404))
    }

    res.status(200).json({ errand: errand })
})

const deleteErrand = asyncWrapper(async (req, res, next) => {
    const { id: errandID } = req.params
    const errand = await Errand.findOneAndDelete({ _id: errandID })
    if (!errand) {
        return next(createCustomError(`No item with id : ${errandID}`, 404))
    }
    res.status(200).json({ errand: errand })
})

const updateErrand = asyncWrapper(async (req, res, next) => {
    const { id: errandID } = req.params

    const errand = await Errand.findOneAndUpdate({ _id: errandID }, req.body, {
        new: true,
        runValidators: true,
    })

    if (!errand) {
        return next(createCustomError(`No item with id : ${errandID}`, 404))
    }

    res.status(200).json({ errand: errand })
})

module.exports = {
    getAllErrands: getAllErrands,
    createErrand: createErrand,
    getErrand: getErrand,
    updateErrand: updateErrand,
    deleteErrand: deleteErrand,
}
