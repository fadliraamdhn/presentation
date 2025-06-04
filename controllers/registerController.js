import { getUserByEmail } from "../models/projectModel.js"
import { pool } from "../config/db.js";
import bcrypt from "bcrypt";

export const renderRegister =  (req, res) => {
    res.render('register')
}

export const register = async (req, res) => {
    let { username, email, password } = req.body
    const emailDatabase = await getUserByEmail(email);

    if (emailDatabase) {
        req.flash('error', 'Email sudah terdaftar!');
        return res.redirect('/register')
    }

    const hashedpass = await bcrypt.hash(password, 10);
    
    try {
        await pool.query('INSERT INTO public.user (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedpass]);
        req.flash('success', 'Email berhasil terdaftar!')
        res.redirect('/register')
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error.');
    }
}