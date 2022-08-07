const asyncHandler = require('express-async-handler')

// @desc Get goals
// @route GET /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get Goals' })
})

// @desc Set goal
// @route POST /api/goals
// @access private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add a text field!")
    }
    res.status(201).json({ message: 'Set Goals' })
})

// @desc Update goal
// @route PUT /api/goals
// @access private
const updateGoal = asyncHandler(async (req, res) => {
    const { id } = req.params
    res.status(200).json({ message: `Update goal of id ${id}` })
})

// @desc Delete goal
// @route DELETE /api/goals
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
    const { id } = req.params
    res.status(200).json({ message: `Delete goal of id ${id}` })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}