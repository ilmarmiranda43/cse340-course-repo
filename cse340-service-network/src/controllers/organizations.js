
import {
    getAllOrganizations,
    getOrganizationDetails,
    getProjectsByOrganization
} from '../models/organizations.js';

export const showOrganizationsPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();

        res.render('organizations', {
            title: 'Our Partner Organizations',
            organizations
        });
    } catch (error) {
        next(error);
    }
};

export const showOrganizationDetailsPage = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return res.status(404).render('404', {
                title: 'Page Not Found'
            });
        }

        const organization = await getOrganizationDetails(id);

        if (!organization) {
            return res.status(404).render('404', {
                title: 'Page Not Found'
            });
        }

        const projects = await getProjectsByOrganization(id);

        res.render('organization', {
            title: organization.name,
            organization,
            projects
        });

    } catch (error) {
        next(error);
    }
};
