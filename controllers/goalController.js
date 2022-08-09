const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc Get goals
// @route GET /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

// @desc Set goal
// @route POST /api/goals
// @access private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add a text field!")
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(201).json({ goal })
})

// @desc Update goal
// @route PUT /api/goals
// @access private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found!')
    }

    //make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized!')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(goal, req.body, {
        new: true,
    })

    res.status(200).json({ message: 'Goal updated', updatedGoal })
})

// @desc Delete goal
// @route DELETE /api/goals
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found!')
    }

    //make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized!')
    }

    const deletedGoal = await Goal.findByIdAndDelete(goal)

    res.status(200).json({ message: `Goal deleted`, deletedGoal })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}