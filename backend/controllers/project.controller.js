const Project = require('../models/project.model');
const Account = require('../models/account.model');

// @desc    Create a new project
// @route   POST /api/v1/projects
exports.createProject = async (req, res) => {
    try {
        const { accountId, ...projectData } = req.body;
        
        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const project = await Project.create({
            ...projectData,
            account: accountId,
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: 'Error creating project', error: error.message });
    }
};

// @desc    Get all projects (with filtering)
// @route   GET /api/v1/projects
exports.getProjects = async (req, res) => {
    // Add logic for filtering by status, assignee, etc.
    const projects = await Project.find({}).populate('account', 'customerName').populate('assignedTo', 'fullName');
    res.status(200).json(projects);
};

// @desc    Get a single project by ID
// @route   GET /api/v1/projects/:id
exports.getProjectById = async (req, res) => {
    const project = await Project.findById(req.params.id)
        .populate('account')
        .populate('assignedTo', 'fullName');
    
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }
    // You would also fetch associated notes and tasks here
    res.status(200).json(project);
};

// Implement other controllers similarly...