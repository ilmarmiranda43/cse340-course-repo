
import express from 'express';
import { fileURLToPath } from 'url';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import path from 'path';

const nodeEnv = process.env.NODE_ENV?.toLowerCase() || 'development';
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

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

// Projects

app.get('/projects', async (req, res) => {
  try {
    const projects = await getAllProjects();

    res.render('projects', {
      title: 'Service Projects',
      projects
    });
  } catch (error) {
    console.error('Error loading projects:', error);
    res.status(500).send('Error loading projects.');
  }
});


// Categories
app.get('/categories', (req, res) => {
  res.render('categories', {
    title: 'Service Project Categories'
  });
});

app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
  console.log(`Environment: ${nodeEnv}`);
});
