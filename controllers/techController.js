import { getSvgs, getTechById } from "../models/projectModel.js";
import { pool } from "../config/db.js"

export const renderTechDashboard = async (req, res) => {
    try {
        const tech = await getSvgs();
        res.render('tech', {
            layout:'layouts/admin',
            tech
        });
    } catch (err) {
        console.error('Error fetching projects:', err.message);
        res.status(500).send('Internal Server Error');
    }  
}

export const addNewTech = async (req, res) => {
    let { tech } = req.body
    const filename = req.file.filename;

    try {
        await pool.query('INSERT INTO svg (path, name) VALUES ($1, $2)', [filename, tech]);
        req.flash('success', 'Berhasil menambah data!');
        res.redirect('/dashboard/tech');
    } catch (err) {
        req.flash('error', 'gagal menambah!');
    }
}

export const deleteTech = async (req, res) => {
    const { id } = req.params

    try {
        await pool.query('DELETE FROM svg WHERE id = $1', [id]);
        req.flash('error', 'Data dihapus!')
        res.redirect('/dashboard/tech');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting card');
    }
}

export const renderEditTech = async (req, res) => {
    const { id } = req.params;
    try {
        const tech = await getTechById(id);
        res.render('editTech', {
        layout:'layouts/admin',
        tech
    });
    } catch (err) {
        console.error('Error fetching projects:', err.message);
        res.status(500).send('Internal Server Error');
    }
}

export const editTech = async (req, res) => {
    let { tech } = req.body
    const filename = req.file ? req.file.filename : null;
    const { id } = req.params
    try {
        await pool.query('UPDATE svg SET path = $1, name = $2 WHERE id = $3', [filename, tech, id]);
        req.flash('success', 'Berhasil edit data!');
        res.redirect('/dashboard/tech');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting card');
    }
}