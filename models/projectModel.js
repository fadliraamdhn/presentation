import { pool } from "../config/db.js"

export const getSvgs = async () => {
    const res = await pool.query(`SELECT * FROM svg`);
    return res.rows;
}

export const getExperience = async () => {
    const res = await pool.query(`SELECT * FROM experience`);
    return res.rows;
}

export const getProjects = async () => {
    const res = await pool.query(`SELECT * FROM projects`);
    return res.rows
}

export const getUserByEmail = async (email) => {
    const res = await pool.query(`SELECT * FROM public.user WHERE email = $1`, [email]);
    return res.rows[0];
}

export const getTechById = async (id) => {
    const res = await pool.query(`SELECT * FROM svg WHERE id = $1`, [id]);
    return res.rows[0];
}

export const getExperienceById = async (id) => {
    const res = await pool.query(`SELECT * FROM experience WHERE id = $1`, [id]);
    return res.rows[0];
}

export const getProjectById = async (id) => {
    const res = await pool.query(`SELECT * FROM projects WHERE id = $1`, [id]);
    return res.rows[0];
}