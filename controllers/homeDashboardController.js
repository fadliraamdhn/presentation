import { log } from "console";
import { pool } from "../config/db.js"
import { getUserByEmail } from "../models/projectModel.js";

export const renderHomeDashboard = async (req, res) => {
    const user = await getUserByEmail(req.session.user.email)
    const userData = req.session.user.name
    res.render('home', {
        layout:'layouts/admin',
        userData,
        user
    });
}

export const updateProfile = async (req, res) => {
    const userEmail = req.session.user.email
    const filename = req.file.filename
    console.log(userEmail);

    try {
        await pool.query('UPDATE public.user SET profile = $1 WHERE email = $2', [filename, userEmail]);
        res.redirect('/dashboard')
    } catch (err) {
        console.error('Error fetching projects:', err.message);
        res.status(500).send('Internal Server Error');
    }
}