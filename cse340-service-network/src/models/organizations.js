
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
