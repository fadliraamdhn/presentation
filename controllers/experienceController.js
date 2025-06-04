import { pool } from "../config/db.js"
import { getExperience, getExperienceById } from "../models/projectModel.js";

export const renderExperienceDashboard = async (req, res) => {
    try {
        const experience = await getExperience();
        res.render('experience', {
        layout:'layouts/admin',
        experience
    });
    } catch (err) {
        console.error('Error fetching projects:', err.message);
        res.status(500).send('Internal Server Error');
    }  
}

export const addNewExperienced = async (req, res) => {
    let {position, company, startDate, endDate, description, tech} = req.body
    const filename = req.file.filename;

    const arrDesc = String(description).split('.').map(s => s.trim()).filter(s => s.length > 0);

    const arrTech = String(tech).split('.').map(s => s.trim()).filter(s => s.length > 0);
    
    try {
        await pool.query('INSERT INTO experience (position, company, start_date, end_date, description, tech, img) VALUES ($1, $2, $3, $4, $5, $6, $7)', [position, company, startDate, endDate, arrDesc, arrTech, filename]);
        req.flash('success', 'Berhasil menambah data!');
        res.redirect('/dashboard/experience');
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error.');
    }
}

export const deleteExperience = async (req, res) => {
    const { id } = req.params

    try {
        await pool.query('DELETE FROM experience WHERE id = $1', [id]);
        res.redirect('/dashboard/experience');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting card');
    }
}

export const renderEditExperience = async (req, res) => {
    const { id } = req.params;
    try {
        const experience = await getExperienceById(id);
        res.render('editExperience', {
        layout:'layouts/admin',
        experience
    });
    } catch (err) {
        console.error('Error fetching projects:', err.message);
        res.status(500).send('Internal Server Error');
    }
}

export const editExperience = async (req, res) => {
    let { position, company, startDate, endDate, description, tech } = req.body
    const filename = req.file ? req.file.filename : null;

    const arrDesc = String(description).split('.').map(s => s.trim()).filter(s => s.length > 0);

    const arrTech = String(tech).split('.').map(s => s.trim()).filter(s => s.length > 0);

    const { id } = req.params
    try {
        await pool.query('UPDATE experience SET position = $1, company = $2, start_date = $3, end_date = $4, description = $5, tech = $6, img = $7 WHERE id = $8', [position, company, startDate, endDate, arrDesc, arrTech, filename, id]);
        req.flash('success', 'Berhasil edit data!');
        res.redirect('/dashboard/experience');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting card');
    }
}