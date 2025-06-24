const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { seedAdmin } = require('./config/seed');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Seed admin user if not exists
seedAdmin();

const app = express();

// Middlewares
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Body parser
app.use(morgan('dev')); // Logger

// --- API Routes ---
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/users', require('./routes/user.routes'));
app.use('/api/v1/leads', require('./routes/lead.routes'));
app.use('/api/v1/accounts', require('./routes/account.routes'));
app.use('/api/v1/projects', require('./routes/project.routes'));
// ... add other routes here

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? process.env.ORIGIN : '*',
};
app.use(cors(corsOptions));