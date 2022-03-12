const express = require('express')
const router = express.Router()

const {
    getAllErrands,
    createErrand,
    getErrand,
    updateErrand,
    deleteErrand,
    editErrand,
} = require('../controllers/errands')

router.route('/').get(getAllErrands).post(createErrand)
router.route('/:id').get(getErrand).patch(updateErrand).delete(deleteErrand)

module.exports = router
