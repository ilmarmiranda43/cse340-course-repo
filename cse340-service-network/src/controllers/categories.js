
import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategory
} from '../models/categories.js';

export const showCategoriesPage = async (req, res, next) => {
    try {
        const categories = await getAllCategories();

        res.render('categories', {
            title: 'Service Project Categories',
            categories
        });
    } catch (error) {
        next(error);
    }
};

export const showCategoryDetailsPage = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return res.status(404).render('404', {
                title: 'Page Not Found'
            });
        }

        const category = await getCategoryDetails(id);

        if (!category) {
            return res.status(404).render('404', {
                title: 'Page Not Found'
            });
        }

        const projects = await getProjectsByCategory(id);

        res.render('category', {
            title: category.name,
            category,
            projects
        });

    } catch (error) {
        next(error);
    }
};
