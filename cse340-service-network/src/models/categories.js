
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
