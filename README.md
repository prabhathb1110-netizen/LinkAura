# Task Tracker

A simple task tracker website built with Node.js, Express, MongoDB and plain HTML/CSS/JS.

## Features
- Add, complete and delete tasks
- Data saved in MongoDB
- Input validation and error messages
- Responsive layout

## Setup
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and put in your MongoDB connection string
3. Start the app: `npm start`
4. Open http://localhost:3000

## API
- `GET /api/tasks` list tasks
- `POST /api/tasks` create a task
- `PUT /api/tasks/:id` update a task
- `DELETE /api/tasks/:id` delete a task
