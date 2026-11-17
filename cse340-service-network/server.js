
import fs from 'node:fs';

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import { getAllOrganizations, getOrganizationDetails } from './src/models/organizations.js';
import {
  getUpcomingProjects,
  getProjectDetails
} from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

const nodeEnv = process.env.NODE_ENV?.toLowerCase() || 'development';
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const publicPath = path.join(__dirname, 'public');
const cssPath = path.join(publicPath, 'css');

console.log('=== STATIC FILES DIAGNOSTIC ===');
console.log('Current directory:', process.cwd());
console.log('Public directory:', publicPath);
console.log('CSS directory exists:', fs.existsSync(cssPath));

if (fs.existsSync(cssPath)) {
  console.log('CSS files:', fs.readdirSync(cssPath));
}

console.log('================================');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Home
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

// Organizations - PostgreSQL
app.get('/organizations', async (req, res) => {
  try {
    const organizations = await getAllOrganizations();

    res.render('organizations', {
      title: 'Our Partner Organizations',
      organizations
    });

  } catch (error) {
    console.error('Error loading organizations:', error);
    res.status(500).send('Error loading organizations.');
  }
});

// Organization Details - Week 03
app.get('/organization/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).send('Invalid organization ID.');
    }

    const organization = await getOrganizationDetails(id);

    if (!organization) {
      return res.status(404).send('Organization not found.');
    }

    res.render('organization', {
      title: organization.name,
      organization
    });

  } catch (error) {
    console.error(
      'Error loading organization details:',
      error
    );

    res.status(500).send(
      'Error loading organization details.'
    );
  }
});

// Upcoming Projects - Week 03
app.get('/projects', async (req, res) => {
  try {
    const projects = await getUpcomingProjects(5);

    res.render('projects', {
      title: 'Upcoming Service Projects',
      projects
    });

  } catch (error) {
    console.error('Error loading projects:', error);
    res.status(500).send('Error loading projects.');
  }
});

// Project Details - Week 03
app.get('/project/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).send('Invalid project ID.');
    }

    const project = await getProjectDetails(id);

    if (!project) {
      return res.status(404).send('Project not found.');
    }

    res.render('project', {
      title: project.title,
      project
    });

  } catch (error) {
    console.error('Error loading project details:', error);
    res.status(500).send('Error loading project details.');
  }
});

// Categories - PostgreSQL
app.get('/categories', async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.render('categories', {
      title: 'Service Project Categories',
      categories
    });

  } catch (error) {
    console.error('Error loading categories:', error);
    res.status(500).send('Error loading categories.');
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
  console.log(`Environment: ${nodeEnv}`);
});
