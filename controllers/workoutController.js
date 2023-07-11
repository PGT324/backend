const Workout = require('../models/workoutModel.js');
const mongoose = require('mongoose')

// checkId 미들웨어
const checkObjectId = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }
    next()
}

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })

    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
    const workout = await Workout.findById(req.params.id)

    if (!workout) {
        return res.status(404).json({ error: 'No such workout!' })
    }

    res.status(200).json(workout)
}


// create new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body
    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.msg })
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id })

    if (!workout) {
        return res.status(404).json({ error: 'No such workout!' })
    }

    res.status(200).json({ msg: 'delete complete!' })
}

// update a workout
const updateWorkout = async (req, res) => {
    const workout = await Workout.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }
    )
    const data = await Workout.findById(req.params.id)

    if (!workout) {
        return res.status(404).json({ error: 'No such workout!' })
    }

    res.status(200).json(data)
}



module.exports = {
    checkObjectId,
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}

