-- CSE 340 - Service Network | Week 02
-- Database setup and sample data.
-- Run against the intended PostgreSQL database.

BEGIN;

CREATE TABLE IF NOT EXISTS organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(200) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

-- Seed organizations only when the same name is absent.
INSERT INTO organization (name, description, contact_email, logo_filename)
SELECT v.name, v.description, v.contact_email, v.logo_filename
FROM (VALUES
    ('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
    ('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
    ('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png')
) AS v(name, description, contact_email, logo_filename)
WHERE NOT EXISTS (
    SELECT 1 FROM organization o WHERE o.name = v.name
);

-- Refer to organizations by name instead of assuming database IDs.
-- The seed avoids inserting an identical organization/title combination twice.
WITH seed_projects (organization_name, title, description, location, date) AS (
    VALUES
    ('BrightFuture Builders', 'Community Playground Renovation', 'Renovate playground equipment and improve safety.', 'Rexburg, Idaho', DATE '2026-11-21'),
    ('BrightFuture Builders', 'Neighborhood Home Repairs', 'Help families with minor home repairs.', 'Idaho Falls, Idaho', DATE '2026-11-28'),
    ('BrightFuture Builders', 'Community Center Painting', 'Paint and improve a local community center.', 'Rexburg, Idaho', DATE '2026-12-05'),
    ('BrightFuture Builders', 'School Library Renovation', 'Repair shelves and improve reading spaces.', 'Sugar City, Idaho', DATE '2026-12-12'),
    ('BrightFuture Builders', 'Accessible Ramp Construction', 'Build accessibility ramps for community members.', 'Idaho Falls, Idaho', DATE '2026-12-19'),
    ('GreenHarvest Growers', 'Urban Community Garden', 'Plant vegetables in a community garden.', 'Rexburg, Idaho', DATE '2026-11-22'),
    ('GreenHarvest Growers', 'Tree Planting Day', 'Plant native trees in public spaces.', 'Idaho Falls, Idaho', DATE '2026-11-29'),
    ('GreenHarvest Growers', 'Sustainable Farming Workshop', 'Teach sustainable gardening techniques.', 'Rexburg, Idaho', DATE '2026-12-06'),
    ('GreenHarvest Growers', 'Community Composting Program', 'Help residents learn composting techniques.', 'Sugar City, Idaho', DATE '2026-12-13'),
    ('GreenHarvest Growers', 'Local Food Harvest', 'Harvest and distribute fresh produce.', 'Idaho Falls, Idaho', DATE '2026-12-20'),
    ('UnityServe Volunteers', 'Community Food Drive', 'Collect food donations for local families.', 'Rexburg, Idaho', DATE '2026-11-23'),
    ('UnityServe Volunteers', 'Winter Clothing Donation', 'Collect warm clothing for people in need.', 'Idaho Falls, Idaho', DATE '2026-11-30'),
    ('UnityServe Volunteers', 'Senior Citizen Assistance', 'Assist senior citizens with daily activities.', 'Rexburg, Idaho', DATE '2026-12-07'),
    ('UnityServe Volunteers', 'Holiday Gift Collection', 'Organize holiday gifts for children.', 'Sugar City, Idaho', DATE '2026-12-14'),
    ('UnityServe Volunteers', 'Community Volunteer Day', 'Coordinate volunteers for community service.', 'Idaho Falls, Idaho', DATE '2026-12-21')
)
INSERT INTO project (organization_id, title, description, location, date)
SELECT o.organization_id, s.title, s.description, s.location, s.date
FROM seed_projects s
JOIN organization o ON o.name = s.organization_name
WHERE NOT EXISTS (
    SELECT 1 FROM project p
    WHERE p.organization_id = o.organization_id AND p.title = s.title
);

COMMIT;

-- Verification queries (read-only)
SELECT COUNT(*) AS total_organizations FROM organization;
SELECT COUNT(*) AS total_projects FROM project;
SELECT o.name AS organization, COUNT(p.project_id) AS total_projects
FROM organization o
LEFT JOIN project p ON p.organization_id = o.organization_id
GROUP BY o.organization_id, o.name
ORDER BY o.name;
