const express = require('express');
const router = express.Router();
const { createProject, getProjects, getProjectById } = require('../controllers/project.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// All routes are protected and require 'projects' permission
router.use(protect);
router.use(authorize('projects'));

router.route('/').post(createProject).get(getProjects);
router.route('/:id').get(getProjectById);
// ... other PUT, DELETE routes

module.exports = router;