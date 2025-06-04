import { getProjects, getProjectById } from "../models/projectModel.js";
import { pool } from "../config/db.js";

export const renderProjectDashboard = async (req, res) => {
    try {
        const projects = await getProjects();
        res.render('project', {
        layout:'layouts/admin',
        projects
    });
    } catch (err) {
        console.error('Error fetching projects:', err.message);
        res.status(500).send('Internal Server Error');
    }
}

export const addNewProject = async (req, res) => {
    let {project, description, tech} = req.body
    const filename = req.file.filename;
    const arrTech = String(tech).split('.').map(s => s.trim()).filter(s => s.length > 0);

    try {
        await pool.query('INSERT INTO projects (img, name, description , tech) VALUES ($1, $2, $3, $4)', [filename, project, description, arrTech]);
        req.flash('success', 'Berhasil menambah data!');
        res.redirect('/dashboard/project');
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error.');
    }
}

export const deleteProject = async (req, res) => {
    const { id } = req.params

    try {
        await pool.query('DELETE FROM projects WHERE id = $1', [id]);
        res.redirect('/dashboard/project');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting card');
    }
}

export const renderEditProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await getProjectById(id);
        res.render('editProject', {
        layout:'layouts/admin',
        project
    });
    } catch (err) {
        console.error('Error fetching projects:', err.message);
        res.status(500).send('Internal Server Error');
    }
}

export const editProject = async (req, res) => {
    let { project, description, tech } = req.body
    const filename = req.file.filename

    const arrTech = String(tech).split('.').map(s => s.trim()).filter(s => s.length > 0);

    const { id } = req.params
    try {
        await pool.query('UPDATE projects SET img = $1, name = $2, description = $3, tech = $4 WHERE id = $5', [filename, project, description, arrTech, id]);
        req.flash('success', 'Berhasil edit data!');
        res.redirect('/dashboard/project');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting card');
    }
}