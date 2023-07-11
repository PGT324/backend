// import express from 'express';
// import dotenv from 'dotenv';
// import workoutRoutes from './routes/workouts.js';
// import mongoose from 'mongoose';
const express = require('express')
require('dotenv').config();
const workoutRoutes = require('./routes/workouts.js');
const mongoose = require('mongoose');

// express app
const app = express();


//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('서버 && MongoDB 접속 성공!')
        })
    })
    .catch((error) => {
        console.log(error)
    })
