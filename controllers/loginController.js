import bcrypt from "bcrypt"
import { getUserByEmail } from "../models/projectModel.js";

export const renderLoginPage = (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        console.error('Error fetching projects:', err.message);
        res.status(500).send('Internal Server Error');
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    
    if (!user) {
        req.flash('error', 'Email atau password salah!');
        return res.redirect('/login');
    }

    if (!bcrypt.compareSync(password, user.password)) {
        req.flash('error', 'Email atau password salah!');
        return res.redirect('/login');
    }

    req.session.user = {
        name: user.username,
        email: user.email
    };

    req.flash('success', 'Berhasil Login!');
    res.redirect('/dashboard');
}