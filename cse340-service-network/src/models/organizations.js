
import pool from "./db.js";

export const getAllOrganizations = async () => {
    try {
        const query = `
      SELECT
        organization_id,
        name,
        description,
        contact_email,
        logo_filename
      FROM organization
      ORDER BY name;
    `;

        const result = await pool.query(query);
        return result.rows;

    } catch (error) {
        console.error(
            "Error fetching organizations:",
            error.message
        );
        throw error;
    }
};
export const getOrganizationDetails = async (id) => {
    try {
        const query = `
      SELECT *
      FROM organization
      WHERE organization_id = $1;
    `;

        const result = await pool.query(query, [id]);

        return result.rows[0] || null;

    } catch (error) {
        console.error(
            "Error fetching organization details:",
            error.message
        );
        throw error;
    }
};

export const getProjectsByOrganization = async (organizationId) => {
    try {
        const query = `
      SELECT
        project_id,
        title,
        description,
        date,
        location
      FROM project
      WHERE organization_id = $1
      ORDER BY date, project_id;
    `;

        const result = await pool.query(query, [organizationId]);
        return result.rows;

    } catch (error) {
        console.error(
            "Error fetching organization projects:",
            error.message
        );
        throw error;
    }
};
