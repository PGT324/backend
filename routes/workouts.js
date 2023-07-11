// import express from 'express';
const express = require('express');
const Workout = require('../models/workoutModel');
const { createWorkout, getWorkouts, getWorkout, checkObjectId, deleteWorkout, updateWorkout } = require('../controllers/workoutController');

const router = express.Router();


// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', checkObjectId, getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', checkObjectId, deleteWorkout)

// UPDATE a workout
router.patch('/:id', checkObjectId, updateWorkout)


module.exports = router;