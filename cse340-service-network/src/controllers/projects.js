
import {
  getUpcomingProjects,
  getProjectDetails
} from '../models/projects.js';

import {
  getCategoriesByProject
} from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

export const showProjectsPage = async (req, res, next) => {
  try {
    const projects = await getUpcomingProjects(
      NUMBER_OF_UPCOMING_PROJECTS
    );

    res.render('projects', {
      title: 'Upcoming Service Projects',
      projects
    });

  } catch (error) {
    next(error);
  }
};

export const showProjectDetailsPage = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(404).render('404', {
        title: 'Page Not Found'
      });
    }

    const project = await getProjectDetails(id);

    if (!project) {
      return res.status(404).render('404', {
        title: 'Page Not Found'
      });
    }

    const categories = await getCategoriesByProject(id);

    res.render('project', {
      title: project.title,
      project,
      categories
    });

  } catch (error) {
    next(error);
  }
};
