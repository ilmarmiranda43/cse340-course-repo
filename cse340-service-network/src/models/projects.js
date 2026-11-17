
import pool from "./db.js";

export const getAllProjects = async () => {
  try {
    const query = `
      SELECT
        p.project_id,
        p.title,
        p.description,
        p.location,
        p.date,
        o.name AS organization_name
      FROM project p
      INNER JOIN organization o
        ON p.organization_id = o.organization_id
      ORDER BY p.date, p.project_id;
    `;

    const result = await pool.query(query);
    return result.rows;

  } catch (error) {
    console.error(
      "Error fetching projects:",
      error.message
    );
    throw error;
  }
};
export const getUpcomingProjects = async (number_of_projects) => {
  try {
    const query = `
      SELECT
        p.project_id,
        p.title,
        p.description,
        p.location,
        p.date,
        p.organization_id,
        o.name AS organization_name
      FROM project p
      INNER JOIN organization o
        ON p.organization_id = o.organization_id
      WHERE p.date >= CURRENT_DATE
      ORDER BY p.date ASC, p.project_id ASC
      LIMIT $1;
    `;

    const result = await pool.query(query, [number_of_projects]);
    return result.rows;

  } catch (error) {
    console.error(
      "Error fetching upcoming projects:",
      error.message
    );
    throw error;
  }
};

export const getProjectDetails = async (id) => {
  try {
    const query = `
      SELECT
        p.project_id,
        p.title,
        p.description,
        p.location,
        p.date,
        p.organization_id,
        o.name AS organization_name
      FROM project p
      INNER JOIN organization o
        ON p.organization_id = o.organization_id
      WHERE p.project_id = $1;
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;

  } catch (error) {
    console.error(
      "Error fetching project details:",
      error.message
    );
    throw error;
  }
};
