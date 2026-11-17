
import pool from "./db.js";

export const getAllCategories = async () => {
    try {
        const query = `
      SELECT
        category_id,
        name
      FROM category
      ORDER BY name;
    `;

        const result = await pool.query(query);
        return result.rows;

    } catch (error) {
        console.error(
            "Error fetching categories:",
            error.message
        );
        throw error;
    }
};

export const getCategoryDetails = async (id) => {
    try {
        const query = `
      SELECT category_id, name
      FROM category
      WHERE category_id = $1;
    `;

        const result = await pool.query(query, [id]);
        return result.rows[0] || null;

    } catch (error) {
        console.error("Error fetching category:", error.message);
        throw error;
    }
};

export const getCategoriesByProject = async (projectId) => {
    try {
        const query = `
      SELECT c.category_id, c.name
      FROM category c
      INNER JOIN project_category pc
        ON c.category_id = pc.category_id
      WHERE pc.project_id = $1
      ORDER BY c.name;
    `;

        const result = await pool.query(query, [projectId]);
        return result.rows;

    } catch (error) {
        console.error(
            "Error fetching project categories:",
            error.message
        );
        throw error;
    }
};

export const getProjectsByCategory = async (categoryId) => {
    try {
        const query = `
      SELECT
        p.project_id,
        p.title,
        p.description,
        p.date,
        p.location,
        p.organization_id,
        o.name AS organization_name
      FROM project p
      INNER JOIN project_category pc
        ON p.project_id = pc.project_id
      INNER JOIN organization o
        ON p.organization_id = o.organization_id
      WHERE pc.category_id = $1
      ORDER BY p.date, p.project_id;
    `;

        const result = await pool.query(query, [categoryId]);
        return result.rows;

    } catch (error) {
        console.error(
            "Error fetching projects by category:",
            error.message
        );
        throw error;
    }
};

