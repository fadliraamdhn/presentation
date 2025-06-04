import { getExperience, getSvgs, getProjects} from '../models/projectModel.js'
import { log } from "console";

export const renderHomePage = async (req, res) => {
    try {
        const experience = await getExperience();
        const svg = await getSvgs();
        const project = await getProjects();
        
        res.render('index', {
          layout: 'layouts/main',
          svg,
          experience,
          project
        });
    } catch (err) {
        console.error('Error fetching projects:', err.message);
        res.status(500).send('Internal Server Error');
    }
};