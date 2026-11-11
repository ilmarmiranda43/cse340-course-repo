
import pool from "./db.js";

export async function getAllOrganizations() {
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
            "Erro ao buscar organizações:",
            error.message
        );

        throw error;
    }
}
